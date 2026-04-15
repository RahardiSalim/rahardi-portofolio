export interface ContentTypeConfig {
  directory: string;
  order: number;
  label: string;
}

export const CONTENT_TYPES: Record<string, ContentTypeConfig> = {
  experiences: {
    directory: '01-experience',
    order: 1,
    label: 'Professional Experience',
  },
  projects: {
    directory: '02-projects',
    order: 2,
    label: 'Projects',
  },
  competitions: {
    directory: '03-competitions-and-awards',
    order: 3,
    label: 'Competitions & Awards',
  },
  activities: {
    directory: '04-activities',
    order: 4,
    label: 'Activities',
  },
  certifications: {
    directory: '05-certifications',
    order: 5,
    label: 'Certifications',
  },
};
