import Link from 'next/link';
import type { Project } from '@/types';
import { ProjectCard } from '@/components/sections/projects';

interface HomeFeaturedProjectsProps {
  projects: Project[];
}

export function HomeFeaturedProjects({ projects }: HomeFeaturedProjectsProps) {
  return (
    <section className="container-custom section-spacing">
      <div className="mb-16">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase dark:text-white">
              Featured Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Latest implementations in ML, NLP, and data engineering.</p>
          </div>
          <Link
            href="/projects"
            className="text-sm font-mono uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:text-gray-500 dark:hover:text-gray-400 transition-all dark:text-white"
          >
            View All →
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
