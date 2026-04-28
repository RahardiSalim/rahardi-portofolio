'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Mdx } from '@/components/common/Mdx';
import { ArtifactSection } from '@/components/common/ArtifactSection';
import { MediaImage } from '@/components/common/MediaImage';

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container-custom section-spacing"
    >
      <div className="max-w-3xl mx-auto">
        <Link
          href="/projects"
          className="inline-block mb-10 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white border-b border-transparent hover:border-black dark:hover:border-white pb-0.5 transition-all"
        >
          ← Back to Projects
        </Link>

        <header className="mb-12">
          {project.type && (
            <p className="text-sm font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
              {project.type}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-black mb-6 dark:text-white tracking-tighter">
            {project.title}
          </h1>
          {project.shortDescription && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{project.shortDescription}</p>
          )}
          <div className="flex flex-wrap gap-3">
            {project.award && <Badge variant="default">🏆 {project.award}</Badge>}
            {project.teamSize && <Badge variant="outline">Team of {project.teamSize}</Badge>}
            {project.role && <Badge variant="outline">{project.role}</Badge>}
          </div>
        </header>

        {project.previewImage && (
          <MediaImage
            src={project.previewImage}
            alt={project.title}
            className="aspect-[16/9] border border-black/10 dark:border-white/10 mb-12"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        )}

        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm uppercase tracking-widest font-mono mb-4 dark:text-white">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <Badge key={tech} variant="outline">{tech}</Badge>
              ))}
            </div>
          </div>
        )}

        {project.longDescription && (
          <div className="prose dark:prose-invert max-w-none mb-12">
            <Mdx content={project.longDescription} />
          </div>
        )}

        {project.artifacts && project.artifacts.length > 0 && (
          <ArtifactSection artifacts={project.artifacts} />
        )}
      </div>
    </motion.div>
  );
}
