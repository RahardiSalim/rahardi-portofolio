'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Experience } from '@/types/portfolio.types';

export function CareerTimeline() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

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
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mb-12 animate-pulse">
            <div className="w-5/12 h-24 bg-gray-100 dark:bg-gray-800 rounded" />
            <div className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-800 flex-shrink-0" />
            <div className="w-5/12 h-24 bg-gray-100 dark:bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    );
  }

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 3);

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* CV Download Button */}
      <div className="flex justify-center mb-16">
        <a
          href="/assets/RahardiSalim_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-mono text-xs uppercase tracking-widest hover:scale-105 transition-all duration-300"
        >
          <span>Download Full CV</span>
          <span className="text-lg group-hover:translate-y-0.5 transition-transform">↓</span>
        </a>
      </div>

      {/* Timeline line */}
      <div className="absolute left-1/2 top-32 bottom-0 w-px bg-gray-200 dark:bg-gray-800 -translate-x-1/2 hidden md:block" />

      <div className="space-y-8 md:space-y-12">
        <AnimatePresence mode="popLayout">
          {displayedExperiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
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
                  <div className="border border-black dark:border-gray-700 bg-white dark:bg-gray-900 p-6 group-hover:border-blue-500 dark:group-hover:border-blue-400 group-hover:shadow-xl transition-all duration-300">
                    {/* Header row */}
                    <div className="flex items-center gap-4 mb-4">
                      {exp.logoImage && (
                        <div className="relative w-10 h-10 flex-shrink-0 border border-gray-100 dark:border-gray-800 p-1 bg-white">
                          <Image
                            src={exp.logoImage}
                            alt={exp.organization}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      )}
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-tighter text-gray-400 mb-1">
                          {exp.startDate || exp.date}
                          {exp.endDate ? ` — ${exp.endDate}` : exp.status === 'ongoing' ? ' — Present' : ''}
                        </div>
                        <h3 className="font-bold text-sm leading-tight dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {exp.position || exp.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                      {exp.organization}
                    </p>

                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {exp.shortDescription}
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="text-[10px] font-mono uppercase tracking-widest text-blue-500">View Details</span>
                       <span className="text-blue-500">→</span>
                    </div>
                  </div>
                </Link>

                {/* Fill spacer for left-side items */}
                {isLeft ? <div className="hidden md:block md:w-12" /> : null}
                {isLeft ? <div className="hidden md:block md:w-5/12" /> : null}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* View More / View Less Button */}
      {experiences.length > 3 && (
        <div className="flex justify-center mt-16">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-mono uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:text-gray-500 dark:hover:text-gray-400 transition-all dark:text-white"
          >
            {showAll ? 'View Less Milestones ↑' : 'View More Milestones ↓'}
          </button>
        </div>
      )}
    </div>
  );
}
