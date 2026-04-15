import path from 'node:path';
import fs from 'node:fs';
import type {
  PortfolioData,
  Project,
  Competition,
  Experience,
  Activity,
  Certification,
  LinkCollection,
  ArtifactFile,
  ParsedMarkdown,
  BaseItem,
} from '@/types/portfolio.types';
import {
  parseMarkdown,
  readDescriptionFile,
  getFolderNames,
  folderToSlug,
  extractTitle,
} from '@/lib/markdown/parser';
import { CONTENT_TYPES } from './portfolio-config';

const CONTENT_ROOT = process.cwd();

// ─── Constants & Types ─────────────────────────────────────────────────────────

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.PNG', '.webp', '.gif']);

const ARTIFACT_TYPE_MAP: Record<string, ArtifactFile['type']> = {
  '.ipynb': 'notebook',
  '.pdf':   'pdf',
  '.ppt':   'pdf',
  '.pptx':  'pdf',
  '.mp4':   'video',
  '.mov':   'video',
};

const ARTIFACT_CATEGORIES = new Set<ArtifactFile['category']>(['code', 'ppt', 'proposal']);

// ─── Helpers ───────────────────────────────────────────────────────────────────

function toApiUrl(absolutePath: string): string {
  const relativePath = path.relative(CONTENT_ROOT, absolutePath);
  return '/api/media/' + relativePath.split(path.sep).join('/');
}

function str(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function parseTechnologies(tech: unknown): string[] {
  if (Array.isArray(tech)) return tech;
  if (typeof tech === 'string') return tech.split(',').map(t => t.trim()).filter(Boolean);
  return [];
}

function parseStatus(status: unknown): BaseItem['status'] {
  const valid = ['completed', 'ongoing', 'in-development'] as const;
  if (typeof status === 'string' && (valid as readonly string[]).includes(status)) {
    return status as BaseItem['status'];
  }
  return 'completed';
}

function parseLinks(links: unknown): LinkCollection {
  return (typeof links === 'object' && links !== null) ? links as LinkCollection : {};
}

// ─── Scanners ──────────────────────────────────────────────────────────────────

function getFirstImageIn(dir: string): string | undefined {
  if (!fs.existsSync(dir)) return undefined;
  try {
    const file = fs.readdirSync(dir).find(f => IMAGE_EXTS.has(path.extname(f)));
    return file ? toApiUrl(path.join(dir, file)) : undefined;
  } catch { return undefined; }
}

function getLogoImage(folderPath: string): string | undefined {
  const mediaDir = path.join(folderPath, 'media');
  if (!fs.existsSync(mediaDir)) return undefined;
  try {
    const file = fs.readdirSync(mediaDir).find(
      f => f.toLowerCase().startsWith('logo') && IMAGE_EXTS.has(path.extname(f))
    );
    return file ? toApiUrl(path.join(mediaDir, file)) : undefined;
  } catch { return undefined; }
}

function scanArtifacts(folderPath: string): ArtifactFile[] {
  const artifactsDir = path.join(folderPath, 'artifacts');
  if (!fs.existsSync(artifactsDir)) return [];
  const result: ArtifactFile[] = [];
  try {
    const categories = fs.readdirSync(artifactsDir);
    for (const cat of categories) {
      const catPath = path.join(artifactsDir, cat);
      if (!fs.statSync(catPath).isDirectory()) continue;
      
      const files = fs.readdirSync(catPath);
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        const type = ARTIFACT_TYPE_MAP[ext];
        if (!type) continue;
        
        result.push({
          name: file,
          type,
          url: toApiUrl(path.join(catPath, file)),
          category: ARTIFACT_CATEGORIES.has(cat as ArtifactFile['category']) ? (cat as ArtifactFile['category']) : 'other',
        });
      }
    }
  } catch { /* skip unreadable */ }
  return result;
}

// ─── Base Item Loader ──────────────────────────────────────────────────────────

function createBaseItem(
  folder: string,
  folderPath: string,
  title: string,
  parsed: ParsedMarkdown
): BaseItem {
  const { metadata, shortDescription, longDescription } = parsed;
  return {
    id: folder,
    title,
    slug: folderToSlug(folder),
    shortDescription,
    longDescription,
    date: str(metadata.date),
    status: parseStatus(metadata.status),
    technologies: parseTechnologies(metadata.technologies),
    links: parseLinks(metadata.links),
    artifacts: scanArtifacts(folderPath),
    logoImage: getLogoImage(folderPath),
    previewImage: getFirstImageIn(path.join(folderPath, 'media', 'photos')),
  };
}

// ─── Specific Type Transformers ────────────────────────────────────────────────

function transformExperience(base: BaseItem, metadata: Record<string, unknown>, folder: string): Experience {
  const year = folder.match(/(\d{4})$/)?.[1] || '2024';
  return {
    ...base,
    organization: str(metadata.organization) || base.title.split(' - ').pop() || '',
    position: str(metadata.position) || base.title.split(' - ').shift() || '',
    location: str(metadata.location, 'Indonesia'),
    startDate: str(metadata.startdate, year),
    endDate: str(metadata.enddate) || undefined,
    achievements: base.longDescription
      .split('\n')
      .filter(line => /^[-*]\s+/.test(line))
      .map(line => line.replace(/^[-*]\s+/, '').trim())
      .slice(0, 5),
  };
}

function transformProject(base: BaseItem, metadata: Record<string, unknown>): Project {
  return {
    ...base,
    type: (metadata.type as Project['type']) || 'other',
    teamSize: str(metadata['team size']),
    role: str(metadata.role),
    award: str(metadata.award),
  };
}

function transformCompetition(base: BaseItem, metadata: Record<string, unknown>, _folder: string, folderPath: string): Competition {
  const certImage = getFirstImageIn(path.join(folderPath, 'media', 'certificates'));
  return {
    ...base,
    award: str(metadata.award),
    rank: str(metadata.rank),
    competitionName: str(metadata.competition) || base.title,
    scope: (metadata.scope as Competition['scope']) || 'university',
    certificateImage: certImage,
    artifacts: [], 
  };
}

// ─── Main Loading Logic ────────────────────────────────────────────────────────

async function loadItems<T>(
  type: keyof typeof CONTENT_TYPES,
  transform: (base: BaseItem, metadata: Record<string, unknown>, folder: string, folderPath: string) => T
): Promise<T[]> {
  const config = CONTENT_TYPES[type];
  const basePath = path.join(CONTENT_ROOT, config.directory);
  const items: T[] = [];
  
  if (!fs.existsSync(basePath)) return [];
  
  const folders = getFolderNames(basePath);
  for (const folder of folders) {
    const folderPath = path.join(basePath, folder);
    const content = readDescriptionFile(folderPath);
    if (!content) continue;
    
    const title = extractTitle(content);
    const parsed = parseMarkdown(content);
    const base = createBaseItem(folder, folderPath, title, parsed);
    
    items.push(transform(base, parsed.metadata, folder, folderPath));
  }
  
  return items;
}

export async function loadPortfolioData(): Promise<PortfolioData> {
  const [experiences, projects, competitions, activities, certifications] = await Promise.all([
    loadItems('experiences', transformExperience),
    loadItems('projects', transformProject),
    loadItems('competitions', transformCompetition),
    loadItems('activities', (base, meta) => ({ ...base, organization: str(meta.organization), role: str(meta.role) } as Activity)),
    loadItems('certifications', (base, meta) => ({ ...base, issuer: str(meta.issuer), credentialId: str(meta.credentialid) } as Certification)),
  ]);

  const mappings: Record<string, string> = {
    'kubuku-rag-credit-scoring':        'gdg-jakarta-hackathon-2025-bronze',
    'poverty-prediction-geospatial-ml': 'gemastik-2025-data-mining-silver',
    'refchecker-gammafest2025':         'gammafest-2025-citation-system-gold',
  };

  for (const [projectId, competitionId] of Object.entries(mappings)) {
    const project = projects.find(p => p.id === projectId);
    const competition = competitions.find(c => c.id === competitionId);
    if (project && competition) {
      project.relatedCompetitions = [competitionId];
      competition.relatedProjects = [projectId];
    }
  }

  return { 
    experiences: experiences.sort((a, b) => b.date.localeCompare(a.date)),
    projects: projects.sort((a, b) => b.date.localeCompare(a.date)),
    competitions: competitions.sort((a, b) => b.date.localeCompare(a.date)),
    activities,
    certifications
  };
}
