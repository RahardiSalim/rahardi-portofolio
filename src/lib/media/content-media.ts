import fs from 'node:fs';
import path from 'node:path';
import type { ArtifactFile } from '@/types';

export const PROJECT_ROOT = process.cwd();
export const CONTENT_ROOT = path.join(PROJECT_ROOT, 'content');
export const MEDIA_API_PREFIX = '/api/media';

export const CONTENT_MEDIA_DIRS = {
  media: 'media',
  photos: path.join('media', 'photos'),
  certificates: path.join('media', 'certificates'),
  artifacts: 'artifacts',
} as const;

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

const ARTIFACT_TYPE_BY_EXTENSION: Record<string, ArtifactFile['type']> = {
  '.ipynb': 'notebook',
  '.pdf': 'pdf',
  '.ppt': 'pdf',
  '.pptx': 'pdf',
  '.mp4': 'video',
  '.mov': 'video',
  '.webm': 'video',
};

const KNOWN_ARTIFACT_CATEGORIES = new Set<ArtifactFile['category']>([
  'code',
  'ppt',
  'proposal',
]);

export const CONTENT_MEDIA_MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ipynb': 'application/json',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.webm': 'video/webm',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};

export type ContentMediaResolution =
  | { ok: true; filePath: string }
  | { ok: false; status: number; message: string };

function normalizedExtension(filePath: string): string {
  return path.extname(filePath).toLowerCase();
}

function isPathInside(root: string, target: string): boolean {
  const relative = path.relative(root, target);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function readDirectory(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  try {
    return fs.readdirSync(dir).sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

function encodeRelativePath(relativePath: string): string {
  return relativePath.split(path.sep).map(encodeURIComponent).join('/');
}

export function contentPath(...segments: string[]): string {
  return path.join(CONTENT_ROOT, ...segments);
}

export function contentItemMediaPath(
  itemPath: string,
  kind: keyof typeof CONTENT_MEDIA_DIRS
): string {
  return path.join(itemPath, CONTENT_MEDIA_DIRS[kind]);
}

export function toContentMediaUrl(absolutePath: string): string {
  const resolvedPath = path.resolve(absolutePath);

  if (!isPathInside(CONTENT_ROOT, resolvedPath)) {
    throw new Error(`Content media path is outside ${CONTENT_ROOT}`);
  }

  const relativePath = path.relative(PROJECT_ROOT, resolvedPath);
  return `${MEDIA_API_PREFIX}/${encodeRelativePath(relativePath)}`;
}

export function isImageFile(fileName: string): boolean {
  return IMAGE_EXTENSIONS.has(normalizedExtension(fileName));
}

export function getFirstImageIn(dir: string): string | undefined {
  const file = readDirectory(dir).find(isImageFile);
  return file ? toContentMediaUrl(path.join(dir, file)) : undefined;
}

export function getAllImagesIn(dir: string): string[] {
  return readDirectory(dir)
    .filter(isImageFile)
    .map((file) => toContentMediaUrl(path.join(dir, file)));
}

export function getLogoImage(itemPath: string): string | undefined {
  const mediaDir = contentItemMediaPath(itemPath, 'media');
  const logo = readDirectory(mediaDir).find(
    (file) => file.toLowerCase().startsWith('logo') && isImageFile(file)
  );

  return logo ? toContentMediaUrl(path.join(mediaDir, logo)) : undefined;
}

export function getFirstPdfIn(dir: string): string | undefined {
  const file = readDirectory(dir).find((entry) => normalizedExtension(entry) === '.pdf');
  return file ? toContentMediaUrl(path.join(dir, file)) : undefined;
}

export function scanArtifacts(itemPath: string): ArtifactFile[] {
  const artifactsDir = contentItemMediaPath(itemPath, 'artifacts');
  const artifacts: ArtifactFile[] = [];

  for (const category of readDirectory(artifactsDir)) {
    const categoryPath = path.join(artifactsDir, category);
    if (!fs.existsSync(categoryPath) || !fs.statSync(categoryPath).isDirectory()) continue;

    for (const file of readDirectory(categoryPath)) {
      const type = ARTIFACT_TYPE_BY_EXTENSION[normalizedExtension(file)];
      if (!type) continue;

      artifacts.push({
        name: file,
        type,
        url: toContentMediaUrl(path.join(categoryPath, file)),
        category: KNOWN_ARTIFACT_CATEGORIES.has(category as ArtifactFile['category'])
          ? (category as ArtifactFile['category'])
          : 'other',
      });
    }
  }

  return artifacts;
}

export function getContentMediaMimeType(filePath: string): string {
  return CONTENT_MEDIA_MIME_TYPES[normalizedExtension(filePath)] || 'application/octet-stream';
}

export function resolveContentMediaRequest(segments: string[] = []): ContentMediaResolution {
  let decodedSegments: string[];

  try {
    decodedSegments = segments.map((segment) => decodeURIComponent(segment));
  } catch {
    return { ok: false, status: 400, message: 'Invalid media path' };
  }

  if (decodedSegments[0] !== 'content') {
    return { ok: false, status: 403, message: 'Forbidden' };
  }

  const filePath = path.resolve(PROJECT_ROOT, ...decodedSegments);

  if (!isPathInside(CONTENT_ROOT, filePath)) {
    return { ok: false, status: 403, message: 'Forbidden' };
  }

  return { ok: true, filePath };
}
