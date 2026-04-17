import type { Experience } from './experience';
import type { Project } from './project';
import type { Competition } from './competition';
import type { Activity } from './activity';
import type { Certification } from './certification';

export interface PortfolioData {
  experiences: Experience[];
  projects: Project[];
  competitions: Competition[];
  activities: Activity[];
  certifications: Certification[];
}
