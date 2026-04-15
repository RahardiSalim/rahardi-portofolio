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
import type { Experience } from '@/types/portfolio.types';

export default function ExperienceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(data => {
        const found = data.experiences.find((e: Experience) => e.slug === slug);
        setExperience(found || null);
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
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />
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

  if (!experience) {
    return (
      <Layout>
        <div className="container-custom section-spacing text-center">
          <h1 className="heading-lg mb-4 dark:text-white">Experience not found</h1>
          <Link href="/experience" className="link-underline dark:text-gray-300">
            ← Back to Experience
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
            href="/experience"
            className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-8"
          >
            ← Experience
          </Link>

          <div className="max-w-4xl">
            {/* Header */}
            <div className="flex items-start gap-6 mb-8">
              {experience.logoImage && (
                <div className="relative w-16 h-16 flex-shrink-0 border border-gray-200 dark:border-gray-700 p-2">
                  <Image
                    src={experience.logoImage}
                    alt={experience.organization}
                    fill
                    className="object-contain p-1"
                    unoptimized
                  />
                </div>
              )}
              <div>
                <Badge variant="outline">Professional Experience</Badge>
                <h1 className="heading-lg mt-3 mb-2 dark:text-white">{experience.title}</h1>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400 font-mono">
                  {experience.organization && <span>{experience.organization}</span>}
                  {experience.location && <span>· {experience.location}</span>}
                  <span>
                    ·{' '}
                    {experience.startDate || experience.date}
                    {experience.endDate
                      ? ` — ${experience.endDate}`
                      : experience.status === 'ongoing'
                      ? ' — Present'
                      : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Short description */}
            <p className="body-lg text-gray-800 dark:text-gray-300 mb-8">
              {experience.shortDescription}
            </p>

            {/* Achievements */}
            {experience.achievements && experience.achievements.length > 0 && (
              <div className="mb-8 p-6 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <h2 className="text-sm uppercase tracking-widest font-mono mb-4 dark:text-white">Key Achievements</h2>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-800 dark:text-gray-300">
                      <span className="text-gray-400 mt-0.5">▸</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {experience.technologies.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm uppercase tracking-widest font-mono mb-3 dark:text-white">Technologies</h2>
                <TechStack technologies={experience.technologies} />
              </div>
            )}

            {/* Artifacts */}
            <ArtifactSection artifacts={experience.artifacts} />

            {/* Long description */}
            {experience.longDescription && (
              <div className="mb-12 border-t border-gray-200 dark:border-gray-700 pt-8">
                <h2 className="text-xl font-light mb-6 dark:text-white">Details</h2>
                <div className="space-y-4">
                  {experience.longDescription.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-800 dark:text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {(experience.links?.github || experience.links?.demo || experience.links?.paper) && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <h2 className="text-sm uppercase tracking-widest font-mono mb-4 dark:text-white">Links</h2>
                <div className="flex flex-wrap gap-3">
                  {experience.links?.github && (
                    <a
                      href={experience.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-black dark:border-gray-600 px-4 py-2 text-sm font-mono hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-white"
                    >
                      GitHub →
                    </a>
                  )}
                  {experience.links?.demo && (
                    <a
                      href={experience.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-mono hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                      Demo →
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </article>
    </Layout>
  );
}
