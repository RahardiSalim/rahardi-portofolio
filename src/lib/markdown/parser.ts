import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ParsedMarkdown } from '@/types';

/**
 * Parse markdown content and extract metadata, short description, and long description
 */
export function parseMarkdown(content: string): ParsedMarkdown {
  const { data, content: markdown } = matter(content);
  
  // Split by ## headers to extract sections
  const sections = markdown.split(/^##\s+/m);
  
  let shortDescription = '';
  let longDescription = '';
  const metadataSection: Record<string, unknown> = {};
  
  sections.forEach((section) => {
    const lines = section.trim().split('\n');
    const header = lines[0]?.toLowerCase() || '';
    
    if (header.includes('metadata')) {
      // Parse metadata section
      const metadataText = lines.slice(1).join('\n');
      parseMetadataSection(metadataText, metadataSection);
    } else if (header.includes('short description')) {
      shortDescription = lines.slice(1).join('\n').trim();
    } else if (header.includes('long description')) {
      longDescription = lines.slice(1).join('\n').trim();
    }
  });
  
  return {
    metadata: { ...data, ...metadataSection },
    shortDescription,
    longDescription,
  };
}

/**
 * Parse metadata section from markdown
 */
function parseMetadataSection(text: string, metadata: Record<string, unknown>) {
  const lines = text.split('\n');
  
  let currentKey = '';
  let currentValue = '';
  
  lines.forEach((line) => {
    const trimmedLine = line.trim();
    
    if (!trimmedLine || trimmedLine === '---') return;
    
    // Match **Key:** Value format
    const match = trimmedLine.match(/^\*\*(.+?):\*\*\s*(.*)$/);
    if (match) {
      if (currentKey) {
        metadata[currentKey.toLowerCase()] = currentValue.trim();
      }
      currentKey = match[1];
      currentValue = match[2];
    } else if (trimmedLine.startsWith('-')) {
      // Link item
      const linkMatch = trimmedLine.match(/^-\s*(.+?):\s*\[(.+?)\]\((.+?)\)/);
      if (linkMatch) {
        if (!metadata.links || typeof metadata.links !== 'object') {
          metadata.links = {} as Record<string, string>;
        }
        const [, emoji, , url] = linkMatch;
        const key = emoji.toLowerCase().replace(/[^\w]/g, '');
        (metadata.links as Record<string, string>)[key] = url;
      }
    } else if (currentKey) {
      currentValue += ' ' + trimmedLine;
    }
  });
  
  if (currentKey) {
    metadata[currentKey.toLowerCase()] = currentValue.trim();
  }
  
  // Process technologies (comma-separated)
  if (metadata.technologies && typeof metadata.technologies === 'string') {
    metadata.technologies = metadata.technologies
      .split(',')
      .map((t: string) => t.trim())
      .filter(Boolean);
  }
}

/**
 * Read a description.md file from a folder
 */
export function readDescriptionFile(folderPath: string): string | null {
  const indexPath = path.join(folderPath, 'index.md');
  if (fs.existsSync(indexPath)) {
    return fs.readFileSync(indexPath, 'utf-8');
  }
  // Fallback for legacy description.md during migration
  const legacyPath = path.join(folderPath, 'description.md');
  if (fs.existsSync(legacyPath)) {
    return fs.readFileSync(legacyPath, 'utf-8');
  }
  return null;
}

/**
 * Get all folder names in a directory
 */
export function getFolderNames(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  
  return fs.readdirSync(dirPath).filter((item) => {
    const fullPath = path.join(dirPath, item);
    return fs.statSync(fullPath).isDirectory();
  });
}

/**
 * Convert folder name to slug
 */
export function folderToSlug(folderName: string): string {
  return folderName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

/**
 * Extract title from markdown content
 */
export function extractTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : 'Untitled';
}
