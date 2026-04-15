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
import type { Project, Competition } from '@/types/portfolio.types';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [allCompetitions, setAllCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(data => {
        const found = data.projects.find((p: Project) => p.slug === slug);
        setProject(found || null);
        setAllCompetitions(data.competitions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getCompetitionSlug = (competitionId: string) => {
    const competition = allCompetitions.find((c) => c.id === competitionId);
    return competition?.slug || competitionId;
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
      <article className="container-custom section-spacing pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-12 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> ALL PROJECTS
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="outline">{project.type.toUpperCase()}</Badge>
                {project.award && <Badge>{project.award}</Badge>}
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-8 dark:text-white tracking-tighter uppercase leading-tight">
                {project.title}
              </h1>

              {project.previewImage && (
                <div className="relative w-full aspect-video mb-12 overflow-hidden border-2 border-black dark:border-white">
                  <Image
                    src={project.previewImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-6 font-mono uppercase tracking-widest border-b border-black dark:border-white pb-2 inline-block">
                   Technical Case Study
                </h2>
                <div className="space-y-6 text-lg leading-relaxed text-gray-800 dark:text-gray-300">
                  {project.longDescription.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Artifacts Section - High Priority for Projects */}
              <div className="mt-16">
                 <h2 className="text-2xl font-bold mb-8 font-mono uppercase tracking-widest border-b border-black dark:border-white pb-2 inline-block">
                   Project Artifacts
                </h2>
                <ArtifactSection artifacts={project.artifacts} />
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-12">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">Metadata</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-[10px] font-mono uppercase text-gray-400">Date</dt>
                      <dd className="text-sm font-bold dark:text-white">{project.date}</dd>
                    </div>
                    {project.role && (
                      <div>
                        <dt className="text-[10px] font-mono uppercase text-gray-400">Role</dt>
                        <dd className="text-sm font-bold dark:text-white">{project.role}</dd>
                      </div>
                    )}
                    {project.teamSize && (
                      <div>
                        <dt className="text-[10px] font-mono uppercase text-gray-400">Team Size</dt>
                        <dd className="text-sm font-bold dark:text-white">{project.teamSize}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">Tech Stack</h3>
                  <TechStack technologies={project.technologies} />
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">Links & Resources</h3>
                  <div className="flex flex-col gap-3">
                    {project.links?.github && (
                      <a href={project.links.github} target="_blank" className="flex justify-between items-center p-4 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-sm font-mono">
                        GITHUB REPOSITORY <span>↗</span>
                      </a>
                    )}
                    {project.links?.demo && (
                      <a href={project.links.demo} target="_blank" className="flex justify-between items-center p-4 bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-all text-sm font-mono">
                        LIVE DEMO <span>↗</span>
                      </a>
                    )}
                    {project.relatedCompetitions?.[0] && (
                       <Link href={`/competitions/${getCompetitionSlug(project.relatedCompetitions[0])}`} className="flex justify-between items-center p-4 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all text-sm font-mono">
                        VIEW COMPETITION STORY <span>→</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </article>
    </Layout>
  );
}
