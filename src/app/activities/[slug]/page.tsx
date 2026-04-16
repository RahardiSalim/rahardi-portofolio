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
import { Markdown } from '@/components/common/Markdown';
import type { Activity } from '@/types/portfolio.types';

export default function ActivityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(data => {
        const found = data.activities.find((a: Activity) => a.slug === slug);
        setActivity(found || null);
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
            <p className="font-mono text-xs animate-pulse uppercase tracking-widest">Loading Activity...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!activity) {
    return (
      <Layout>
        <div className="container-custom section-spacing text-center">
          <h1 className="heading-lg mb-4 dark:text-white">Activity not found</h1>
          <Link href="/activities" className="link-underline dark:text-gray-300">
            ← Back to Activities
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
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-12 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> ALL ACTIVITIES
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Header */}
              <div className="flex items-start gap-6 mb-12">
                {activity.logoImage && (
                  <div className="relative w-20 h-20 flex-shrink-0 border border-gray-100 dark:border-gray-800 p-2 bg-white">
                    <Image
                      src={activity.logoImage}
                      alt={activity.organization}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                )}
                <div>
                  <Badge variant="outline">{activity.role || 'Activity'}</Badge>
                  <h1 className="text-4xl md:text-6xl font-black mt-4 mb-2 dark:text-white tracking-tighter uppercase leading-tight">
                    {activity.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-gray-500 uppercase tracking-widest">
                    <span className="font-bold text-black dark:text-white">{activity.organization}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>{activity.date}</span>
                    {activity.participants && (
                      <>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span>{activity.participants} participants</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview Image */}
              {activity.previewImage && (
                <div className="relative w-full aspect-video mb-12 overflow-hidden border border-black dark:border-white">
                  <Image
                    src={activity.previewImage}
                    alt={activity.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              {/* Long Description */}
              {activity.longDescription && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold mb-8 font-mono uppercase tracking-widest border-b border-black dark:border-white pb-2 inline-block">
                    About this Activity
                  </h2>
                  <Markdown content={activity.longDescription} />
                </div>
              )}

              {/* Artifacts */}
              {activity.artifacts && activity.artifacts.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold mb-8 font-mono uppercase tracking-widest border-b border-black dark:border-white pb-2 inline-block">
                    Materials & Artifacts
                  </h2>
                  <ArtifactSection artifacts={activity.artifacts} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-12">
                {/* Metadata */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">Details</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-[10px] font-mono uppercase text-gray-400">Organization</dt>
                      <dd className="text-sm font-bold dark:text-white">{activity.organization}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-mono uppercase text-gray-400">Role</dt>
                      <dd className="text-sm font-bold dark:text-white">{activity.role}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-mono uppercase text-gray-400">Date</dt>
                      <dd className="text-sm font-bold dark:text-white">{activity.date}</dd>
                    </div>
                    {activity.participants && (
                      <div>
                        <dt className="text-[10px] font-mono uppercase text-gray-400">Participants</dt>
                        <dd className="text-sm font-bold dark:text-white">{activity.participants}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Technologies */}
                {activity.technologies.length > 0 && (
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">Technologies</h3>
                    <TechStack technologies={activity.technologies} />
                  </div>
                )}

                {/* External Links */}
                {(activity.links?.github || activity.links?.demo || activity.links?.video || activity.links?.presentation) && (
                  <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">Resources</h3>
                    <div className="flex flex-col gap-3">
                      {activity.links?.github && (
                        <a href={activity.links.github} target="_blank" rel="noopener noreferrer"
                          className="flex justify-between items-center p-4 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-sm font-mono">
                          GITHUB <span>↗</span>
                        </a>
                      )}
                      {activity.links?.presentation && (
                        <a href={activity.links.presentation} target="_blank" rel="noopener noreferrer"
                          className="flex justify-between items-center p-4 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-sm font-mono">
                          SLIDES <span>↗</span>
                        </a>
                      )}
                      {activity.links?.video && (
                        <a href={activity.links.video} target="_blank" rel="noopener noreferrer"
                          className="flex justify-between items-center p-4 bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-all text-sm font-mono">
                          WATCH RECORDING <span>↗</span>
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
