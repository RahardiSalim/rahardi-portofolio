export interface LinkCollection {
  github?: string;
  demo?: string;
  video?: string;
  paper?: string;
  presentation?: string;
  certificate?: string;
  related?: string;
}

export interface ArtifactFile {
  name: string;
  type: 'notebook' | 'pdf' | 'video' | 'other';
  url: string;
  category: 'code' | 'ppt' | 'proposal' | 'other';
}

export interface BaseItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  date: string;
  status?: 'completed' | 'ongoing' | 'in-development';
  technologies: string[];
  links: LinkCollection;
  mediaPath?: string;
  artifactsPath?: string;
  artifacts: ArtifactFile[];
  previewImage?: string;
  logoImage?: string;
}

export interface ParsedMarkdown {
  metadata: Record<string, unknown>;
  shortDescription: string;
  longDescription: string;
}

export type Slug = string;

export type WithSlug<T> = T & { slug: Slug };
