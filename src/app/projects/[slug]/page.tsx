'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Badge } from '@/components/common/Badge';
import { TechStack } from '@/components/common/TechStack';
import { ArtifactSection } from '@/components/portfolio/ArtifactSection';
import type { Project } from '@/types/portfolio.types';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(data => {
        const found = data.projects.find((p: Project) => p.slug === slug);
        setProject(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="container-custom section-spacing">
          <div className="animate-pulse space-y-8 max-w-4xl">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="container-custom section-spacing text-center">
          <h1 className="heading-lg mb-4 dark:text-white">Project not found</h1>
          <Link href="/projects" className="link-underline dark:text-gray-300">
            ← Back to Projects
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container-custom section-spacing">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-8"
          >
            ← Projects
          </Link>

          <div className="max-w-4xl">
            {/* Type + award badge */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">{project.type.toUpperCase()}</Badge>
              {project.award && <Badge>{project.award}</Badge>}
            </div>

            <h1 className="heading-lg mb-4 dark:text-white">{project.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8 font-mono">
              {project.date && <span>{project.date}</span>}
              {project.role && <span>· {project.role}</span>}
              {project.teamSize && <span>· Team: {project.teamSize}</span>}
            </div>

            {/* Preview image */}
            {project.previewImage ? (
              <div className="relative w-full h-72 md:h-96 mb-8 overflow-hidden border border-black dark:border-gray-700">
                <Image
                  src={project.previewImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-full h-48 mb-8 bg-gray-100 dark:bg-gray-800 border border-black dark:border-gray-700 flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500 text-sm font-mono">
                  No photos yet — add images to media/photos/
                </span>
              </div>
            )}

            {/* Short description */}
            <p className="body-lg text-gray-800 dark:text-gray-300 mb-8">
              {project.shortDescription}
            </p>

            {/* Technologies */}
            {project.technologies.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm uppercase tracking-widest font-mono mb-3 dark:text-white">Technologies</h2>
                <TechStack technologies={project.technologies} />
              </div>
            )}

            {/* Artifacts: notebooks, slides, proposals */}
            <ArtifactSection artifacts={project.artifacts} />

            {/* Long description */}
            {project.longDescription && (
              <div className="mb-12 border-t border-gray-200 dark:border-gray-700 pt-8">
                <h2 className="text-xl font-light mb-6 dark:text-white">About This Project</h2>
                <div className="space-y-4">
                  {project.longDescription.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-800 dark:text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <h2 className="text-sm uppercase tracking-widest font-mono mb-4 dark:text-white">Links</h2>
              <div className="flex flex-wrap gap-3">
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-black dark:border-gray-600 px-4 py-2 text-sm font-mono hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-white"
                  >
                    GitHub →
                  </a>
                )}
                {project.links?.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-mono hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    Live Demo →
                  </a>
                )}
                {project.links?.paper && (
                  <a
                    href={project.links.paper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-black dark:border-gray-600 px-4 py-2 text-sm font-mono hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-white"
                  >
                    Paper →
                  </a>
                )}
                {project.links?.presentation && (
                  <a
                    href={project.links.presentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-black dark:border-gray-600 px-4 py-2 text-sm font-mono hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-white"
                  >
                    Slides →
                  </a>
                )}
                {project.relatedCompetitions && project.relatedCompetitions.length > 0 && (
                  <Link
                    href={`/competitions/${project.relatedCompetitions[0]}`}
                    className="inline-flex items-center gap-2 border border-black dark:border-gray-600 px-4 py-2 text-sm font-mono hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-white"
                  >
                    Competition Entry →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </article>
    </Layout>
  );
}
