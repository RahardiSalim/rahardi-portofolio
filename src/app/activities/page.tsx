'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layout } from '@/components/layout/Layout';
import type { Activity } from '@/types/portfolio.types';
import { motion } from 'framer-motion';
import { Badge } from '@/components/common/Badge';

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        setActivities(data.activities || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
        setLoading(false);
      }
    }
    fetchActivities();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container-custom section-spacing min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse font-mono uppercase tracking-widest">Loading Activities...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container-custom pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 border-b-8 border-black dark:border-white pb-12"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-8 dark:text-white tracking-tighter uppercase">
            Activities &<br />Involvement
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl font-light leading-relaxed">
              Community engagement, speaking events, and leadership roles across the AI and data science ecosystem.
            </p>
            <div className="text-xs font-mono uppercase tracking-widest text-gray-400">
              {activities.length} Activities
            </div>
          </div>
        </motion.div>

        {activities.length === 0 ? (
          <div className="text-center py-32 border-2 border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 font-mono uppercase tracking-widest">No activities indexed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
              >
                <Link href={`/activities/${activity.slug}`} className="group block border border-black dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Preview image */}
                  {activity.previewImage && (
                    <div className="relative w-full h-48 overflow-hidden border-b border-black/10 dark:border-white/10">
                      <Image
                        src={activity.previewImage}
                        alt={activity.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <Badge variant="outline" className="text-[10px] py-0.5 shrink-0">{activity.role || 'Participant'}</Badge>
                      <span className="text-xs font-mono text-gray-400">{activity.date}</span>
                    </div>
                    <h3 className="text-xl font-bold dark:text-white mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{activity.title}</h3>
                    <p className="text-sm font-mono text-blue-600 dark:text-blue-400 mb-4 uppercase tracking-wide">{activity.organization}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">{activity.shortDescription}</p>
                    {(activity.artifacts?.length > 0) && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 text-[11px] font-mono text-gray-400">
                        <span className="animate-pulse">●</span>
                        <span>{activity.artifacts.length} artifact{activity.artifacts.length > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    <div className="mt-4 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View Details</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
