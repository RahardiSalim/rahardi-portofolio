'use client';

import { useState } from 'react';
import type { Experience } from '@/types';
import { ExperienceTimeline } from '@/components/sections/experience';

interface HomeTimelineProps {
  experiences: Experience[];
}

const EXPERIENCE_TABS = [
  {
    value: 'professional',
    label: 'Professional',
    description: 'Industry, research, and teaching roles across AI, data, and engineering.',
  },
  {
    value: 'organization',
    label: 'Org / Volunteer',
    description: 'Community, leadership, and volunteer work in student and tech organizations.',
  },
] as const;

type ExperienceTab = (typeof EXPERIENCE_TABS)[number]['value'];

export function HomeTimeline({ experiences }: HomeTimelineProps) {
  const [activeTab, setActiveTab] = useState<ExperienceTab>('professional');
  const activeConfig = EXPERIENCE_TABS.find((tab) => tab.value === activeTab) ?? EXPERIENCE_TABS[0];
  const displayedExperiences = experiences.filter((experience) => experience.category === activeTab);

  return (
    <section className="bg-gray-50 dark:bg-gray-800 w-full py-32">
      <div className="container-custom">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase dark:text-white">
              Career Path
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              {activeConfig.description}
            </p>
          </div>

          <div className="inline-flex w-full max-w-md border border-black dark:border-white bg-white dark:bg-gray-900 p-1">
            {EXPERIENCE_TABS.map((tab) => {
              const isActive = tab.value === activeTab;
              const count = experiences.filter((experience) => experience.category === tab.value).length;

              return (
                <button
                  key={tab.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex-1 px-4 py-3 text-xs font-mono uppercase tracking-widest transition-colors ${
                    isActive
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <ExperienceTimeline key={activeTab} experiences={displayedExperiences} />
      </div>
    </section>
  );
}
