'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Experience } from '@/types/portfolio.types';

export function CareerTimeline() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(data => {
        setExperiences(data.experiences || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="relative max-w-4xl mx-auto py-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mb-12 animate-pulse">
            <div className="w-5/12 h-24 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
            <div className="w-5/12 h-24 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700 -translate-x-1/2 hidden md:block" />

      <div className="space-y-8 md:space-y-12">
        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="relative flex items-start"
            >
              {/* Center dot - only md+ */}
              <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black dark:bg-white border-2 border-white dark:border-gray-900 hidden md:block z-10 mt-6" />

              {/* Spacer for right-side items on md */}
              {isLeft ? null : <div className="hidden md:block md:w-5/12" />}
              {isLeft ? null : <div className="hidden md:block md:w-12" />}

              {/* Card */}
              <Link
                href={`/experience/${exp.slug}`}
                className={`w-full md:w-5/12 group ${!isLeft ? '' : 'md:ml-auto'}`}
              >
                <div className="border border-black dark:border-gray-700 bg-white dark:bg-gray-800 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  {/* Header row */}
                  <div className="flex items-center gap-3 mb-3">
                    {exp.logoImage && (
                      <div className="relative w-8 h-8 flex-shrink-0 overflow-hidden">
                        <Image
                          src={exp.logoImage}
                          alt={exp.organization}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      {exp.startDate || exp.date}
                      {exp.endDate ? ` — ${exp.endDate}` : exp.status === 'ongoing' ? ' — Present' : ''}
                    </div>
                  </div>

                  <h3 className="font-semibold text-base leading-tight mb-1 dark:text-white group-hover:underline underline-offset-2">
                    {exp.position || exp.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {exp.organization}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {exp.shortDescription}
                  </p>
                </div>
              </Link>

              {/* Fill spacer for left-side items */}
              {isLeft ? <div className="hidden md:block md:w-12" /> : null}
              {isLeft ? <div className="hidden md:block md:w-5/12" /> : null}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
