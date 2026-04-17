import type { BaseItem } from './common';

export interface Competition extends BaseItem {
  award: string;
  rank: string;
  competitionName: string;
  scope?: 'national' | 'university' | 'international';
  certificateImage?: string;
  images?: string[];
  relatedProjects?: string[];
}
