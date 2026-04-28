import path from 'node:path';
import fs from 'node:fs';
import type {
  PortfolioData,
  Project,
  Competition,
  Experience,
  Activity,
  LinkCollection,
  ParsedMarkdown,
  BaseItem,
} from '@/types';
import {
  parseMarkdown,
  readDescriptionFile,
  getFolderNames,
  folderToSlug,
  extractTitle,
} from '@/lib/markdown/parser';
import {
  PROJECT_ROOT,
  contentItemMediaPath,
  getAllImagesIn,
  getFirstImageIn,
  getLogoImage,
  scanArtifacts,
} from '@/lib/media';
import { CONTENT_TYPES } from './portfolio-config';

// ─── Helpers ───────────────────────────────────────────────────────────────────

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

function parseExperienceTitle(title: string): Pick<Experience, 'organization' | 'position'> {
  const dashParts = title.split(' - ');
  if (dashParts.length >= 2) {
    return {
      position: dashParts.slice(0, -1).join(' - ').trim(),
      organization: dashParts[dashParts.length - 1].trim(),
    };
  }

  const atMatch = title.match(/^(.+?)\s+at\s+(.+)$/i);
  if (atMatch) {
    return {
      position: atMatch[1].trim(),
      organization: atMatch[2].trim(),
    };
  }

  return { position: title, organization: '' };
}

function getExperienceCategory(organization: string): Experience['category'] {
  const org = organization.toLowerCase();
  return org.includes('ristek') || org.includes('compfest')
    ? 'organization'
    : 'professional';
}

// ─── Base Item Loader ──────────────────────────────────────────────────────────

function createBaseItem(
  folder: string,
  folderPath: string,
  title: string,
  parsed: ParsedMarkdown
): BaseItem {
  const { metadata, shortDescription, longDescription } = parsed;
  // Remove leading number from slug if present (e.g., "10.name" -> "name")
  const cleanSlug = folder.replace(/^\d+\./, '');
  
  return {
    id: folder,
    title,
    slug: folderToSlug(cleanSlug),
    shortDescription,
    longDescription,
    date: str(metadata.date),
    status: parseStatus(metadata.status),
    technologies: parseTechnologies(metadata.technologies),
    links: parseLinks(metadata.links),
    artifacts: scanArtifacts(folderPath),
    logoImage: getLogoImage(folderPath),
    previewImage: getFirstImageIn(contentItemMediaPath(folderPath, 'photos')),
  };
}

// ─── Specific Type Transformers ────────────────────────────────────────────────

function transformExperience(base: BaseItem, metadata: Record<string, unknown>, folder: string): Experience {
  const year = folder.match(/(\d{4})$/)?.[1] || '2024';
  const titleParts = parseExperienceTitle(base.title);
  const organization = str(metadata.organization) || titleParts.organization;
  const position = str(metadata.position) || titleParts.position;

  return {
    ...base,
    category: getExperienceCategory(organization),
    organization,
    position,
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
  const certImage = getFirstImageIn(contentItemMediaPath(folderPath, 'certificates'));
  const allPhotos = getAllImagesIn(contentItemMediaPath(folderPath, 'photos'));
  
  return {
    ...base,
    award: str(metadata.award),
    rank: str(metadata.rank),
    competitionName: str(metadata.competition) || base.title,
    scope: (metadata.scope as Competition['scope']) || 'university',
    certificateImage: certImage,
    images: allPhotos,
    artifacts: [], // Artifacts are moved to Projects
  };
}

// ─── Main Loading Logic ────────────────────────────────────────────────────────

async function loadItems<T>(
  type: keyof typeof CONTENT_TYPES,
  transform: (base: BaseItem, metadata: Record<string, unknown>, folder: string, folderPath: string) => T
): Promise<T[]> {
  const config = CONTENT_TYPES[type];
  const basePath = path.join(PROJECT_ROOT, config.directory);
  const items: T[] = [];
  
  if (!fs.existsSync(basePath)) return [];
  
  const folders = getFolderNames(basePath);
  
  // Sort folders numerically (reverse) based on leading number
  // Sort alphabetically; date-based ordering is handled by frontmatter
  const sortedFolders = folders.sort((a, b) => a.localeCompare(b));

  for (const folder of sortedFolders) {
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
  const [experiences, projects, competitions, activities] = await Promise.all([
    loadItems('experiences', transformExperience),
    loadItems('projects', transformProject),
    loadItems('competitions', transformCompetition),
    loadItems('activities', (base, meta) => ({ 
      ...base, 
      organization: str(meta.organization), 
      role: str(meta.role) 
    } as Activity)),
  ]);

  // Enhanced Dynamic Mapping Logic
  // Match competitions to projects by checking if the slug of the project is contained in the competition's folder name or slug
  for (const comp of competitions) {
    const compSlug = comp.slug;
    const compId = comp.id;
    
    // Try to find a project that relates to this competition
    const relatedProject = projects.find(proj => {
      const projSlug = proj.slug;
      // Heuristic: if project slug is part of competition slug or vice versa
      return compSlug.includes(projSlug) || projSlug.includes(compSlug);
    });

    if (relatedProject) {
      if (!relatedProject.relatedCompetitions) relatedProject.relatedCompetitions = [];
      if (!relatedProject.relatedCompetitions.includes(compId)) {
        relatedProject.relatedCompetitions.push(compId);
      }
      
      if (!comp.relatedProjects) comp.relatedProjects = [];
      if (!comp.relatedProjects.includes(relatedProject.id)) {
        comp.relatedProjects.push(relatedProject.id);
      }
    }
  }

  return { 
    experiences,
    projects,
    competitions,
    activities
  };
}
