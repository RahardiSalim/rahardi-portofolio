import type { BaseItem } from './common';

export interface Certification extends BaseItem {
  issuer: string;
  credentialId?: string;
}
