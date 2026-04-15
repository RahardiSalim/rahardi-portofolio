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
} from '@/types/portfolio.types';
import {
  parseMarkdown,
  readDescriptionFile,
  getFolderNames,
  folderToSlug,
  extractTitle,
} from '@/lib/markdown/parser';

const CONTENT_ROOT = process.cwd();

// ─── File type maps ────────────────────────────────────────────────────────────

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

// ─── URL helper ────────────────────────────────────────────────────────────────

function toApiUrl(absolutePath: string): string {
  return '/api/media/' + path.relative(CONTENT_ROOT, absolutePath).split(path.sep).join('/');
}

// ─── File scanners ─────────────────────────────────────────────────────────────

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

function getCertificateImage(folderPath: string): string | undefined {
  return getFirstImageIn(path.join(folderPath, 'media', 'certificates'));
}

function scanArtifacts(folderPath: string): ArtifactFile[] {
  const artifactsDir = path.join(folderPath, 'artifacts');
  if (!fs.existsSync(artifactsDir)) return [];
  const result: ArtifactFile[] = [];
  try {
    for (const cat of fs.readdirSync(artifactsDir)) {
      const catPath = path.join(artifactsDir, cat);
      if (!fs.statSync(catPath).isDirectory()) continue;
      for (const file of fs.readdirSync(catPath)) {
        const ext = path.extname(file).toLowerCase();
        const type = ARTIFACT_TYPE_MAP[ext];
        if (!type) continue;
        result.push({
          name: file,
          type,
          url: toApiUrl(path.join(catPath, file)),
          category: ARTIFACT_CATEGORIES.has(cat as ArtifactFile['category'])
            ? (cat as ArtifactFile['category'])
            : 'other',
        });
      }
    }
  } catch { /* skip unreadable dirs */ }
  return result;
}

// ─── Generic folder loader (eliminates 5x repeating loop) ─────────────────────

async function loadFolderItems<T>(
  basePath: string,
  transform: (folder: string, folderPath: string, title: string, parsed: ParsedMarkdown) => T
): Promise<T[]> {
  const items: T[] = [];
  for (const folder of getFolderNames(basePath)) {
    const folderPath = path.join(basePath, folder);
    const content = readDescriptionFile(folderPath);
    if (!content) continue;
    items.push(transform(folder, folderPath, extractTitle(content), parseMarkdown(content)));
  }
  return items;
}

// ─── Metadata helpers ──────────────────────────────────────────────────────────

function str(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function parseTechnologies(tech: unknown): string[] {
  if (Array.isArray(tech)) return tech;
  if (typeof tech === 'string') return tech.split(',').map(t => t.trim()).filter(Boolean);
  return [];
}

function parseStatus(status: unknown): 'completed' | 'ongoing' | 'in-development' {
  const valid = ['completed', 'ongoing', 'in-development'] as const;
  return valid.includes(status as typeof valid[number])
    ? (status as 'completed' | 'ongoing' | 'in-development')
    : 'completed';
}

function parseLinks(links: unknown): LinkCollection {
  return (typeof links === 'object' && links !== null) ? links as LinkCollection : {};
}

function parseProjectType(type: unknown): Project['type'] {
  const valid: Project['type'][] = ['hackathon', 'research', 'web-app', 'competition', 'environmental', 'other'];
  return valid.includes(type as Project['type']) ? (type as Project['type']) : 'other';
}

function parseCompetitionScope(scope: unknown): Competition['scope'] {
  const valid: NonNullable<Competition['scope']>[] = ['national', 'university', 'international'];
  return valid.includes(scope as NonNullable<Competition['scope']>)
    ? (scope as NonNullable<Competition['scope']>)
    : 'university';
}

// ─── Title parsers ─────────────────────────────────────────────────────────────

function orgFromTitle(title: string): string {
  const parts = title.split(' - ');
  return parts.length > 1 ? parts[parts.length - 1].trim() : title.trim();
}

function positionFromTitle(title: string): string {
  const parts = title.split(' - ');
  return parts.length > 1 ? parts.slice(0, -1).join(' - ').trim() : title.trim();
}

function rankFromTitle(title: string): string {
  return title.match(/(\d+(?:st|nd|rd|th)\s+Place|Gold|Silver|Bronze)/i)?.[1] ?? '';
}

function awardFromTitle(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('1st place') || lower.includes('gold'))   return String.fromCodePoint(0x1F947) + ' 1st Place (Gold)';
  if (lower.includes('2nd place') || lower.includes('silver')) return String.fromCodePoint(0x1F948) + ' 2nd Place (Silver)';
  if (lower.includes('3rd place') || lower.includes('bronze')) return String.fromCodePoint(0x1F949) + ' 3rd Place (Bronze)';
  return '';
}

function competitionNameFromTitle(title: string): string {
  const parts = title.split('-');
  return parts.length > 1 ? parts.slice(1).join('-').trim() : title;
}

function yearFromFolder(folder: string): string {
  return folder.match(/(\d{4})(?:-\w+)?$/)?.[1] ?? '';
}

function achievementsFromDescription(description: string): string[] {
  return description
    .split('\n')
    .filter(line => /^[-*]\s+/.test(line))
    .map(line => line.replace(/^[-*]\s+/, '').trim())
    .slice(0, 5);
}

// ─── Loaders ───────────────────────────────────────────────────────────────────

async function loadExperiences(): Promise<Experience[]> {
  const items = await loadFolderItems<Experience>(
    path.join(CONTENT_ROOT, '01-professional-experience'),
    (folder, folderPath, title, { metadata, shortDescription, longDescription }) => {
      const year = folder.match(/(\d{4})$/)?.[1] ?? str(metadata.date, '2024');
      return {
        id: folder,
        title,
        slug:         folderToSlug(folder),
        shortDescription,
        longDescription,
        date:         str(metadata.date, year),
        organization: str(metadata.organization) || orgFromTitle(title),
        position:     str(metadata.position)     || positionFromTitle(title),
        location:     str(metadata.location, 'Indonesia'),
        startDate:    str(metadata.startdate, year),
        endDate:      str(metadata.enddate) || undefined,
        status:       parseStatus(metadata.status),
        technologies: parseTechnologies(metadata.technologies),
        links:        parseLinks(metadata.links),
        achievements: achievementsFromDescription(longDescription),
        artifacts:    scanArtifacts(folderPath),
        logoImage:    getLogoImage(folderPath),
        previewImage: getFirstImageIn(path.join(folderPath, 'media', 'photos')),
      };
    }
  );
  return items.sort((a, b) => (b.startDate || b.date).localeCompare(a.startDate || a.date));
}

async function loadProjects(): Promise<Project[]> {
  const items = await loadFolderItems<Project>(
    path.join(CONTENT_ROOT, '02-projects'),
    (folder, folderPath, title, { metadata, shortDescription, longDescription }) => ({
      id: folder,
      title,
      slug:         folderToSlug(folder),
      shortDescription,
      longDescription,
      date:         str(metadata.date),
      type:         parseProjectType(metadata.type),
      status:       parseStatus(metadata.status),
      technologies: parseTechnologies(metadata.technologies),
      links:        parseLinks(metadata.links),
      teamSize:     str(metadata['team size']),
      role:         str(metadata.role),
      award:        str(metadata.award),
      artifacts:    scanArtifacts(folderPath),
      logoImage:    getLogoImage(folderPath),
      previewImage: getFirstImageIn(path.join(folderPath, 'media', 'photos')),
    })
  );
  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function loadCompetitions(): Promise<Competition[]> {
  const items = await loadFolderItems<Competition>(
    path.join(CONTENT_ROOT, '03-competitions-and-awards'),
    (folder, folderPath, title, { metadata, shortDescription, longDescription }) => {
      const photoImage = getFirstImageIn(path.join(folderPath, 'media', 'photos'));
      const certImage  = getCertificateImage(folderPath);
      return {
        id: folder,
        title,
        slug:             folderToSlug(folder),
        shortDescription,
        longDescription,
        date:             str(metadata.date)        || yearFromFolder(folder),
        award:            str(metadata.award)       || awardFromTitle(title),
        rank:             rankFromTitle(title),
        competitionName:  str(metadata.competition) || competitionNameFromTitle(title),
        scope:            parseCompetitionScope(metadata.scope),
        status:           'completed' as const,
        technologies:     parseTechnologies(metadata.technologies),
        links:            parseLinks(metadata.links),
        artifacts:        scanArtifacts(folderPath),
        certificateImage: certImage,
        previewImage:     photoImage ?? certImage,
      };
    }
  );
  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function loadActivities(): Promise<Activity[]> {
  return loadFolderItems<Activity>(
    path.join(CONTENT_ROOT, '04-activities'),
    (folder, folderPath, title, { metadata, shortDescription, longDescription }) => ({
      id: folder,
      title,
      slug:         folderToSlug(folder),
      shortDescription,
      longDescription,
      date:         str(metadata.date),
      organization: str(metadata.organization),
      role:         str(metadata.role),
      participants: str(metadata.participants),
      status:       'completed' as const,
      technologies: parseTechnologies(metadata.technologies),
      links:        parseLinks(metadata.links),
      artifacts:    scanArtifacts(folderPath),
      previewImage: getFirstImageIn(path.join(folderPath, 'media', 'photos')),
      logoImage:    getLogoImage(folderPath),
    })
  );
}

async function loadCertifications(): Promise<Certification[]> {
  return loadFolderItems<Certification>(
    path.join(CONTENT_ROOT, '05-certifications'),
    (folder, folderPath, title, { metadata, shortDescription, longDescription }) => ({
      id: folder,
      title,
      slug:         folderToSlug(folder),
      shortDescription,
      longDescription,
      date:         str(metadata.date),
      issuer:       str(metadata.issuer),
      credentialId: str(metadata.credentialid),
      status:       'completed' as const,
      technologies: parseTechnologies(metadata.technologies),
      links:        parseLinks(metadata.links),
      artifacts:    [],
      logoImage:    getLogoImage(folderPath),
    })
  );
}

// ─── Cross-references ──────────────────────────────────────────────────────────

function linkRelatedItems(projects: Project[], competitions: Competition[]): void {
  const mappings: Record<string, string> = {
    'kubuku-rag-credit-scoring':        'gdg-jakarta-hackathon-2025-bronze',
    'poverty-prediction-geospatial-ml': 'gemastik-2025-data-mining-silver',
    'refchecker-gammafest2025':         'gammafest-2025-citation-system-gold',
  };
  for (const [projectId, competitionId] of Object.entries(mappings)) {
    const project     = projects.find(p => p.id === projectId);
    const competition = competitions.find(c => c.id === competitionId);
    if (project && competition) {
      project.relatedCompetitions = [competitionId];
      competition.relatedProjects = [projectId];
    }
  }
}

// ─── Main export ───────────────────────────────────────────────────────────────

export async function loadPortfolioData(): Promise<PortfolioData> {
  const [experiences, projects, competitions, activities, certifications] = await Promise.all([
    loadExperiences(),
    loadProjects(),
    loadCompetitions(),
    loadActivities(),
    loadCertifications(),
  ]);
  linkRelatedItems(projects, competitions);
  return { experiences, projects, competitions, activities, certifications };
}
