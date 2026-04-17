'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Experience } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Mdx } from '@/components/common/Mdx';
import { formatDateRange } from '@/lib/utils';

interface ExperienceDetailProps {
  experience: Experience;
}

export function ExperienceDetail({ experience }: ExperienceDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container-custom section-spacing"
    >
      <div className="max-w-3xl mx-auto">
        <Link
          href="/experience"
          className="inline-block mb-10 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white border-b border-transparent hover:border-black dark:hover:border-white pb-0.5 transition-all"
        >
          ← Back to Experience
        </Link>

        <header className="mb-12">
          <p className="text-sm font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
            {experience.organization}
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-6 dark:text-white tracking-tighter">
            {experience.position}
          </h1>
          <div className="flex flex-wrap gap-3 items-center">
            <Badge variant="outline">{formatDateRange(experience.startDate, experience.endDate)}</Badge>
            {experience.location && <Badge variant="outline">{experience.location}</Badge>}
          </div>
        </header>

        {experience.technologies && experience.technologies.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm uppercase tracking-widest font-mono mb-4 dark:text-white">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech: string) => (
                <Badge key={tech} variant="default">{tech}</Badge>
              ))}
            </div>
          </div>
        )}

        {experience.longDescription && (
          <div className="prose dark:prose-invert max-w-none">
            <Mdx content={experience.longDescription} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
