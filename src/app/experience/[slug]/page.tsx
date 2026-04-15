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
        <div className="container-custom section-spacing min-h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-black dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
            <p className="font-mono text-xs animate-pulse uppercase tracking-widest">Loading Details...</p>
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
      <article className="container-custom section-spacing pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-12 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK TO HOME
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              {/* Header */}
              <div className="flex items-start gap-6 mb-12">
                {experience.logoImage && (
                  <div className="relative w-20 h-20 flex-shrink-0 border border-gray-100 dark:border-gray-800 p-2 bg-white">
                    <Image
                      src={experience.logoImage}
                      alt={experience.organization}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                )}
                <div>
                  <Badge variant="outline">Professional Experience</Badge>
                  <h1 className="text-4xl md:text-6xl font-black mt-4 mb-2 dark:text-white tracking-tighter uppercase leading-tight">
                    {experience.position || experience.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-gray-500 uppercase tracking-widest">
                    <span className="font-bold text-black dark:text-white">{experience.organization}</span>
                    {experience.location && (
                      <>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span>{experience.location}</span>
                      </>
                    )}
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>
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

              {/* Achievements */}
              {experience.achievements && experience.achievements.length > 0 && (
                <div className="mb-16 p-8 border border-black dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <h2 className="text-xs uppercase tracking-widest font-mono mb-6 dark:text-white font-bold border-b border-black dark:border-white pb-2 inline-block">Key Achievements</h2>
                  <ul className="space-y-4">
                    {experience.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-4 text-base text-gray-800 dark:text-gray-300 leading-relaxed">
                        <span className="text-blue-500 mt-1">●</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Long description */}
              {experience.longDescription && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold mb-8 font-mono uppercase tracking-widest border-b border-black dark:border-white pb-2 inline-block">Role Details</h2>
                  <div className="space-y-6 text-lg leading-relaxed text-gray-800 dark:text-gray-300">
                    {experience.longDescription.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Artifacts Section */}
              {experience.artifacts && experience.artifacts.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold mb-8 font-mono uppercase tracking-widest border-b border-black dark:border-white pb-2 inline-block">Work Artifacts</h2>
                  <ArtifactSection artifacts={experience.artifacts} />
                </div>
              )}
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-12">
                {/* Technologies */}
                {experience.technologies.length > 0 && (
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">Technologies Used</h3>
                    <TechStack technologies={experience.technologies} />
                  </div>
                )}

                {/* Links */}
                {(experience.links?.github || experience.links?.demo || experience.links?.paper) && (
                  <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">Resources</h3>
                    <div className="flex flex-col gap-3">
                      {experience.links?.github && (
                        <a
                          href={experience.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex justify-between items-center p-4 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-sm font-mono"
                        >
                          GITHUB REPOSITORY <span>↗</span>
                        </a>
                      )}
                      {experience.links?.demo && (
                        <a
                          href={experience.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex justify-between items-center p-4 bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-all text-sm font-mono"
                        >
                          LIVE DEMO <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </article>
    </Layout>
  );
}
