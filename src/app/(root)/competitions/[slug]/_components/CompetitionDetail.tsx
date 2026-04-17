'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Competition } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Mdx } from '@/components/common/Mdx';

interface CompetitionDetailProps {
  competition: Competition;
}

export function CompetitionDetail({ competition }: CompetitionDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container-custom section-spacing"
    >
      <div className="max-w-3xl mx-auto">
        <Link
          href="/competitions"
          className="inline-block mb-10 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white border-b border-transparent hover:border-black dark:hover:border-white pb-0.5 transition-all"
        >
          ← Back to Competitions
        </Link>

        <header className="mb-12">
          {competition.competitionName && (
            <p className="text-sm font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
              {competition.competitionName}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-black mb-6 dark:text-white tracking-tighter">
            {competition.title}
          </h1>
          {competition.shortDescription && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{competition.shortDescription}</p>
          )}
          <div className="flex flex-wrap gap-3">
            {competition.award && <Badge variant="default">🏆 {competition.award}</Badge>}
            {competition.rank && <Badge variant="outline">Rank #{competition.rank}</Badge>}
            {competition.scope && <Badge variant="outline">{competition.scope}</Badge>}
          </div>
        </header>

        {competition.longDescription && (
          <div className="prose dark:prose-invert max-w-none">
            <Mdx content={competition.longDescription} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
