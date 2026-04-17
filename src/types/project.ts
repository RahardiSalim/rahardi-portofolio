import type { BaseItem } from './common';

export interface Project extends BaseItem {
  type: 'hackathon' | 'research' | 'web-app' | 'competition' | 'environmental' | 'other';
  teamSize?: string;
  role?: string;
  award?: string;
  relatedCompetitions?: string[];
}
