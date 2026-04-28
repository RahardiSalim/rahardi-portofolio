export interface ContentTypeConfig {
  directory: string;
  order: number;
  label: string;
}

export const CONTENT_TYPES: Record<string, ContentTypeConfig> = {
  experiences: {
    directory: 'content/experience',
    order: 1,
    label: 'Professional Experience',
  },
  projects: {
    directory: 'content/projects',
    order: 2,
    label: 'Projects',
  },
  competitions: {
    directory: 'content/competitions',
    order: 3,
    label: 'Competitions & Awards',
  },
  activities: {
    directory: 'content/activities',
    order: 4,
    label: 'Activities',
  },
};
