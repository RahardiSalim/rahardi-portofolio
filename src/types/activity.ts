import type { BaseItem } from './common';

export interface Activity extends BaseItem {
  organization: string;
  role: string;
  participants?: string;
}
