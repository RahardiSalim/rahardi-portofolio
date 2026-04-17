import type { BaseItem } from './common';

export interface Experience extends BaseItem {
  organization: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  achievements: string[];
}
