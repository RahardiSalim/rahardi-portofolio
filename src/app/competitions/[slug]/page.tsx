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
import type { Competition, Project } from '@/types/portfolio.types';

export default function CompetitionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(data => {
        const found = data.competitions.find((c: Competition) => c.slug === slug);
        setCompetition(found || null);
        setAllProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

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
      <article className="container-custom section-spacing pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/competitions"
            className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-12 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> ALL AWARDS
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <Badge variant="default" className="text-lg py-1 px-4">{competition.award}</Badge>
              </div>

              <h1 className="text-5xl md:text-7xl font-black mb-8 dark:text-white tracking-tighter uppercase leading-tight">
                {competition.competitionName}
              </h1>

              <div className="flex justify-center items-center gap-6 text-sm font-mono text-gray-500 dark:text-gray-400">
                <span>{competition.date}</span>
                <span>•</span>
                <span className="uppercase">{competition.scope || 'National'}</span>
                <span>•</span>
                <span>{competition.rank || 'Finalist'}</span>
              </div>
            </div>

            {competition.previewImage && (
              <div className="relative w-full aspect-video mb-20 overflow-hidden border-2 border-black dark:border-white shadow-2xl">
                <Image
                  src={competition.previewImage}
                  alt={competition.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            <div className="prose dark:prose-invert max-w-none">
              <div className="mb-20">
                <h2 className="text-3xl font-black mb-8 font-mono uppercase tracking-widest border-b-4 border-black dark:border-white pb-2 inline-block">
                   The Story
                </h2>
                <div className="space-y-8 text-xl leading-relaxed text-gray-800 dark:text-gray-300 font-light italic">
                  {competition.longDescription.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievement / Key Takeaways Section */}
            <div className="bg-black dark:bg-gray-800 text-white p-12 mb-20 border-l-8 border-blue-500">
               <h3 className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-6">Key Takeaways & Achievements</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <p className="text-lg font-bold">Outcome</p>
                     <p className="text-sm text-gray-400 leading-relaxed">
                        Successfully navigated the competition to achieve <span className="text-white font-mono">{competition.award}</span>. 
                        This involved rigorous technical implementation and strategic problem solving.
                     </p>
                  </div>
                  <div className="space-y-4">
                     <p className="text-lg font-bold">Skills Applied</p>
                     <TechStack technologies={competition.technologies} />
                  </div>
               </div>
            </div>

            <div className="border-t border-black dark:border-white pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="text-center md:text-left">
                  <p className="text-xs font-mono uppercase text-gray-500 mb-2">Interested in the implementation?</p>
                  <p className="text-lg font-bold dark:text-white">View the technical project behind this award.</p>
               </div>
               {competition.relatedProjects?.[0] && (
                  <Link href={`/projects/${getProjectSlug(competition.relatedProjects[0])}`} className="group relative inline-block bg-black dark:bg-white text-white dark:text-black px-10 py-5 text-sm font-mono uppercase tracking-widest overflow-hidden">
                     <span className="relative z-10">VIEW PROJECT ARTIFACTS</span>
                     <motion.div className="absolute inset-0 bg-blue-600 dark:bg-blue-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Link>
               )}
            </div>
          </div>
        </motion.div>
      </article>
    </Layout>
  );
}
