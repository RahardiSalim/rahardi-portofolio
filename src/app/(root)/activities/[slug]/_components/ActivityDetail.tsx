'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Activity } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Mdx } from '@/components/common/Mdx';
import { ArtifactSection } from '@/components/common/ArtifactSection';

interface ActivityDetailProps {
  activity: Activity;
}

export function ActivityDetail({ activity }: ActivityDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container-custom section-spacing"
    >
      <div className="max-w-3xl mx-auto">
        <Link
          href="/activities"
          className="inline-block mb-10 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white border-b border-transparent hover:border-black dark:hover:border-white pb-0.5 transition-all"
        >
          ← Back to Activities
        </Link>

        <header className="mb-12">
          <p className="text-sm font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
            {activity.organization}
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-6 dark:text-white tracking-tighter">
            {activity.title}
          </h1>
          <div className="flex flex-wrap gap-3">
            {activity.role && <Badge variant="outline">{activity.role}</Badge>}
            {activity.participants && (
              <Badge variant="outline">{activity.participants} participants</Badge>
            )}
          </div>
        </header>

        {activity.longDescription && (
          <div className="prose dark:prose-invert max-w-none mb-12">
            <Mdx content={activity.longDescription} />
          </div>
        )}

        {activity.artifacts && activity.artifacts.length > 0 && (
          <ArtifactSection artifacts={activity.artifacts} />
        )}
      </div>
    </motion.div>
  );
}
