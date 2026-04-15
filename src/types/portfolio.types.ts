// Core portfolio data types
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

export interface Project extends BaseItem {
  type: 'hackathon' | 'research' | 'web-app' | 'competition' | 'environmental' | 'other';
  teamSize?: string;
  role?: string;
  award?: string;
  relatedCompetitions?: string[];
}

export interface Competition extends BaseItem {
  award: string;
  rank: string;
  competitionName: string;
  scope?: 'national' | 'university' | 'international';
  certificateImage?: string;
  images?: string[];
  relatedProjects?: string[];
}

export interface Experience extends BaseItem {
  organization: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  achievements: string[];
}

export interface Activity extends BaseItem {
  organization: string;
  role: string;
  participants?: string;
}

export interface Certification extends BaseItem {
  issuer: string;
  credentialId?: string;
}

export interface PortfolioData {
  experiences: Experience[];
  projects: Project[];
  competitions: Competition[];
  activities: Activity[];
  certifications: Certification[];
}

export interface ParsedMarkdown {
  metadata: Record<string, unknown>;
  shortDescription: string;
  longDescription: string;
}

