import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/portfolio.types';
import { Card, CardBody, CardFooter } from '@/components/common/Card';
import { TechStack } from '@/components/common/TechStack';
import { Badge } from '@/components/common/Badge';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const badge = project.award || project.type.toUpperCase();
  const artifactCount = project.artifacts?.length || 0;

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <Card delay={index * 0.1} className="h-full flex flex-col border border-black dark:border-gray-700 hover:border-black dark:hover:border-white hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Visual Header */}
        <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden border-b border-black dark:border-gray-700">
          {project.previewImage ? (
            <Image
              src={project.previewImage}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              unoptimized
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full opacity-20">
               <span className="text-6xl font-mono">{project.title.charAt(0)}</span>
            </div>
          )}
          
          {/* Artifact Counter Overlay */}
          {artifactCount > 0 && (
            <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-black/90 px-2 py-1 text-[10px] font-mono border border-black dark:border-white flex items-center gap-1">
              <span className="animate-pulse">●</span> {artifactCount} ARTIFACTS
            </div>
          )}
          
          <div className="absolute top-3 left-3">
             <Badge variant="default" className="text-[10px] py-0.5">{badge}</Badge>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-bold dark:text-white leading-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-gray-500 dark:text-gray-400">{project.date}</p>
          </div>

          <CardBody className="flex-1 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
              {project.shortDescription}
            </p>
          </CardBody>

          <CardFooter className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-4">
            <TechStack technologies={project.technologies} limit={4} />
            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500">
               <span>View Case Study</span>
               <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
