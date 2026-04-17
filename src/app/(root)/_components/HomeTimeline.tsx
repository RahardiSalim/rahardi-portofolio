import type { Experience } from '@/types';
import { ExperienceTimeline } from '@/components/sections/experience';

interface HomeTimelineProps {
  experiences: Experience[];
}

export function HomeTimeline({ experiences }: HomeTimelineProps) {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 w-full py-32">
      <div className="container-custom">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase dark:text-white">
            Career Path
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Professional journey showcasing growth through internships, leadership roles, and continuous learning.
          </p>
        </div>
        <ExperienceTimeline experiences={experiences} />
      </div>
    </section>
  );
}
