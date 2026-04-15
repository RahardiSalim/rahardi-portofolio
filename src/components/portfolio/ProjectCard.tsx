import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/portfolio.types';
import { Card, CardBody, CardFooter } from '@/components/common/Card';
import { TechStack } from '@/components/common/TechStack';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const badge = project.award || project.type.toUpperCase();
  return (
    <Link href={`/projects/${project.slug}`}>
      <Card delay={index * 0.1}>
        {/* Preview image banner */}
        {project.previewImage ? (
          <div className="relative w-full h-44 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-4 overflow-hidden">
            <Image
              src={project.previewImage}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            <div className="absolute top-3 left-3">
              <span className="bg-black/80 dark:bg-white/90 text-white dark:text-black text-xs font-mono px-2 py-1 uppercase tracking-wider">
                {badge}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-36 mb-4 bg-gray-100 dark:bg-gray-700 overflow-hidden">
            <span className="text-3xl opacity-30">{project.type === 'research' ? '🔬' : project.type === 'hackathon' ? '⚡' : '💡'}</span>
          </div>
        )}

        <div className="mb-2">
          {!project.previewImage && (
            <span className="inline-block text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-1">{badge}</span>
          )}
          <h3 className="heading-sm dark:text-white line-clamp-2">{project.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-mono mt-1">{project.date}</p>
        </div>

        <CardBody>
          <p className="line-clamp-3">{project.shortDescription}</p>
        </CardBody>

        <CardFooter>
          <TechStack technologies={project.technologies} limit={3} />
          <span className="ml-auto text-xs font-mono group-hover:translate-x-1 transition-transform">
            →
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
