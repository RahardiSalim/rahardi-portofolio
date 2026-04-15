'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Badge } from '@/components/common/Badge';
import { Markdown } from '@/components/common/Markdown';
import type { Competition, Project } from '@/types/portfolio.types';

export default function CompetitionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
        <div className="container-custom section-spacing min-h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-black dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
            <p className="font-mono text-xs animate-pulse uppercase tracking-widest">Loading Story...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!competition) {
    return (
      <Layout>
        <div className="container-custom section-spacing text-center">
          <h1 className="heading-lg mb-4 dark:text-white">Competition story not found</h1>
          <Link href="/competitions" className="link-underline dark:text-gray-300">
            ← Back to Competitions
          </Link>
        </div>
      </Layout>
    );
  }

  const galleryImages = competition.images || (competition.previewImage ? [competition.previewImage] : []);

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
            <span className="group-hover:-translate-x-1 transition-transform">←</span> ALL ACHIEVEMENTS
          </Link>

          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <Badge variant="default" className="text-lg py-1 px-4">{competition.award}</Badge>
              </div>

              <h1 className="text-5xl md:text-7xl font-black mb-8 dark:text-white tracking-tighter uppercase leading-tight">
                {competition.competitionName || competition.title}
              </h1>

              <div className="flex justify-center items-center gap-6 text-sm font-mono text-gray-500 uppercase tracking-widest">
                <span>{competition.date}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>{competition.scope} Level</span>
                {competition.rank && (
                  <>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>Rank: {competition.rank}</span>
                  </>
                )}
              </div>
            </div>

            {/* Certificate Highlight */}
            {competition.certificateImage && (
              <div className="relative w-full aspect-[4/3] mb-20 overflow-hidden border border-black dark:border-white shadow-2xl bg-gray-50 dark:bg-gray-900 group cursor-zoom-in" onClick={() => setSelectedImage(competition.certificateImage!)}>
                <Image
                  src={competition.certificateImage}
                  alt="Certificate"
                  fill
                  className="object-contain p-4 md:p-12 transition-transform duration-500 group-hover:scale-[1.02]"
                  unoptimized
                />
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-mono px-3 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to Expand
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
              <div className="lg:col-span-8">
                <h2 className="text-2xl font-bold mb-8 font-mono uppercase tracking-widest border-b border-black dark:border-white pb-2 inline-block">
                  The Journey
                </h2>
                <Markdown content={competition.longDescription} />
              </div>

              <div className="lg:col-span-4">
                <div className="sticky top-32 p-8 border border-black dark:border-white bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">Action</h3>
                  <div className="space-y-4">
                    {competition.relatedProjects?.[0] && (
                      <Link
                        href={`/projects/${getProjectSlug(competition.relatedProjects[0])}`}
                        className="flex justify-between items-center p-5 bg-black text-white dark:bg-white dark:text-black hover:scale-[1.02] transition-all text-sm font-mono uppercase tracking-widest"
                      >
                        View Project Implementation <span>→</span>
                      </Link>
                    )}
                    <a
                      href={`mailto:rahardisalim23@gmail.com?subject=Inquiry about ${competition.title}`}
                      className="flex justify-between items-center p-5 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-sm font-mono uppercase tracking-widest"
                    >
                      Inquire Details <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Gallery / Collage */}
            {galleryImages.length > 0 && (
              <div className="mt-20">
                <h2 className="text-xl font-mono uppercase tracking-widest mb-8 dark:text-white border-b border-black dark:border-white pb-2 inline-block">Moments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {galleryImages.map((img, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className={`relative overflow-hidden border border-black dark:border-white bg-gray-100 dark:bg-gray-800 cursor-zoom-in group ${
                        idx === 0 && galleryImages.length % 2 !== 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-video'
                      }`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <Image
                        src={img}
                        alt={`Moment ${idx + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </article>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full max-w-6xl max-h-[90vh]"
            >
              <Image
                src={selectedImage}
                alt="Expanded View"
                fill
                className="object-contain"
                unoptimized
              />
            </motion.div>
            <button 
              className="absolute top-8 right-8 text-white text-4xl font-light hover:text-blue-500 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
