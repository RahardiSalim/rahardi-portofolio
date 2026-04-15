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
import type { Competition, Project } from '@/types/portfolio.types';

export default function CompetitionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(data => {
        const found = data.competitions.find((c: Competition) => c.slug === slug);
        setCompetition(found || null);
        setAllProjects(data.projects || []);
        // Collect all photos if preview is available
        if (found?.previewImage) {
          setPhotos([found.previewImage]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  // Helper function to get project slug from ID
  const getProjectSlug = (projectId: string) => {
    const project = allProjects.find((p) => p.id === projectId);
    return project?.slug || projectId;
  };

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

  if (!competition) {
    return (
      <Layout>
        <div className="container-custom section-spacing text-center">
          <h1 className="heading-lg mb-4 dark:text-white">Competition not found</h1>
          <Link href="/competitions" className="link-underline dark:text-gray-300">
            ← Back to Competitions
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
            href="/competitions"
            className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-8"
          >
            ← Competitions
          </Link>

          <div className="max-w-4xl">
            {/* Award badge */}
            {competition.award && (
              <div className="mb-4">
                <Badge>{competition.award}</Badge>
              </div>
            )}

            <h1 className="heading-lg mb-4 dark:text-white">{competition.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8 font-mono">
              {competition.date && <span>{competition.date}</span>}
              {competition.scope && <span>· {competition.scope.toUpperCase()}</span>}
              {competition.competitionName && <span>· {competition.competitionName}</span>}
            </div>

            {/* Preview image */}
            {photos.length > 0 && (
              <div className="relative w-full h-72 md:h-96 mb-8 overflow-hidden border border-black dark:border-gray-700">
                <Image
                  src={photos[0]}
                  alt={competition.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            {/* Placeholder if no image */}
            {photos.length === 0 && (
              <div className="w-full h-48 mb-8 bg-gray-100 dark:bg-gray-800 border border-black dark:border-gray-700 flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500 text-sm font-mono">No photos available yet</span>
              </div>
            )}

            {/* Short description */}
            <p className="body-lg text-gray-800 dark:text-gray-300 mb-8">
              {competition.shortDescription}
            </p>

            {/* Technologies */}
            {competition.technologies.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm uppercase tracking-widest font-mono mb-3 dark:text-white">Technologies</h2>
                <TechStack technologies={competition.technologies} />
              </div>
            )}

            {/* Artifacts: notebooks, slides, proposals */}
            <ArtifactSection artifacts={competition.artifacts} />

            {/* Long description */}
            {competition.longDescription && (
              <div className="mb-12 border-t border-gray-200 dark:border-gray-700 pt-8">
                <h2 className="text-xl font-light mb-6 dark:text-white">About This Competition</h2>
                <div className="prose dark:prose-invert max-w-none">
                  {competition.longDescription.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 text-gray-800 dark:text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <h2 className="text-sm uppercase tracking-widest font-mono mb-4 dark:text-white">Resources</h2>
              <div className="flex flex-wrap gap-3">
                {competition.links?.github && (
                  <a
                    href={competition.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-black dark:border-gray-600 px-4 py-2 text-sm font-mono hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-white"
                  >
                    Code →
                  </a>
                )}
                {competition.links?.presentation && (
                  <a
                    href={competition.links.presentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-black dark:border-gray-600 px-4 py-2 text-sm font-mono hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-white"
                  >
                    Slides →
                  </a>
                )}
                {competition.links?.certificate && (
                  <a
                    href={competition.links.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-black dark:border-gray-600 px-4 py-2 text-sm font-mono hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-white"
                  >
                    Certificate →
                  </a>
                )}
                {competition.relatedProjects && competition.relatedProjects.length > 0 && (
                  <Link
                    href={`/projects/${getProjectSlug(competition.relatedProjects[0])}`}
                    className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-mono hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    View Project →
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
