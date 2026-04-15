'use client';

import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { CompetitionCard } from '@/components/portfolio/CompetitionCard';
import type { Competition } from '@/types/portfolio.types';
import { motion } from 'framer-motion';

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompetitions() {
      try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        setCompetitions(data.competitions);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch competitions:', error);
        setLoading(false);
      }
    }

    fetchCompetitions();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container-custom section-spacing min-h-[60vh] flex items-center justify-center">
           <div className="animate-pulse font-mono uppercase tracking-widest">Loading Awards...</div>
        </div>
      </Layout>
    );
  }

  // Group by award type for a structured layout
  const goldMedals = competitions.filter(c => c.award.includes('🥇') || c.award.toLowerCase().includes('gold') || c.award.toLowerCase().includes('1st'));
  const silverMedals = competitions.filter(c => c.award.includes('🥈') || c.award.toLowerCase().includes('silver') || c.award.toLowerCase().includes('2nd'));
  const bronzeMedals = competitions.filter(c => c.award.includes('🥉') || c.award.toLowerCase().includes('bronze') || c.award.toLowerCase().includes('3rd'));
  const others = competitions.filter(c => !goldMedals.includes(c) && !silverMedals.includes(c) && !bronzeMedals.includes(c));

  return (
    <Layout>
      <section className="container-custom pt-32 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 border-b-8 border-black dark:border-white pb-12"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-8 dark:text-white tracking-tighter uppercase">Award<br />Recognition</h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl font-light leading-relaxed">
               A testament to excellence and innovation. National and international recognition for outstanding achievements in the field of Artificial Intelligence and Data Science.
            </p>
            <div className="text-xs font-mono uppercase tracking-widest text-gray-400">
               {competitions.length} Total Honors
            </div>
          </div>
        </motion.div>

        <div className="space-y-32">
          {/* Gold Medals */}
          {goldMedals.length > 0 && (
            <div>
              <div className="flex items-center gap-6 mb-12">
                 <span className="text-4xl">🥇</span>
                 <h2 className="text-3xl font-black uppercase tracking-tighter dark:text-white">The Gold Standard</h2>
                 <div className="flex-1 h-[2px] bg-black dark:bg-white opacity-10" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {goldMedals.map((competition, index) => (
                  <CompetitionCard key={competition.id} competition={competition} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Silver Medals */}
          {silverMedals.length > 0 && (
            <div>
              <div className="flex items-center gap-6 mb-12">
                 <span className="text-4xl">🥈</span>
                 <h2 className="text-3xl font-black uppercase tracking-tighter dark:text-white">Silver Achievements</h2>
                 <div className="flex-1 h-[2px] bg-black dark:bg-white opacity-10" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {silverMedals.map((competition, index) => (
                  <CompetitionCard key={competition.id} competition={competition} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Bronze & Others */}
          {(bronzeMedals.length > 0 || others.length > 0) && (
            <div>
              <div className="flex items-center gap-6 mb-12">
                 <span className="text-4xl">🥉</span>
                 <h2 className="text-3xl font-black uppercase tracking-tighter dark:text-white">Honors & Recognition</h2>
                 <div className="flex-1 h-[2px] bg-black dark:bg-white opacity-10" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[...bronzeMedals, ...others].map((competition, index) => (
                  <CompetitionCard key={competition.id} competition={competition} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>

        {competitions.length === 0 && (
          <div className="text-center py-32 border-2 border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 font-mono uppercase tracking-widest">No awards indexed yet.</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
