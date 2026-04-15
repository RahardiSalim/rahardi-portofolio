'use client';

import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { CompetitionCard } from '@/components/portfolio/CompetitionCard';
import type { Competition } from '@/types/portfolio.types';

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
        <div className="container-custom section-spacing">
          <div className="animate-pulse">Loading competitions...</div>
        </div>
      </Layout>
    );
  }

  // Group by award type
  const goldMedals = competitions.filter(c => c.award.includes('🥇'));
  const silverMedals = competitions.filter(c => c.award.includes('🥈'));
  const bronzeMedals = competitions.filter(c => c.award.includes('🥉'));

  return (
    <Layout>
      <section className="container-custom section-spacing">
        <div className="mb-16">
          <h1 className="heading-xl mb-6 dark:text-white">Competition Awards</h1>
          <p className="body-lg text-gray-800 dark:text-gray-300 max-w-2xl">
            Recognition from national and international competitions in data science, 
            machine learning, and AI.
          </p>
        </div>

        {/* Gold Medals */}
        {goldMedals.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-light mb-8 border-b border-black dark:border-gray-700 pb-4 dark:text-white">
              🥇 Gold Medals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goldMedals.map((competition, index) => (
                <CompetitionCard key={competition.id} competition={competition} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Silver Medals */}
        {silverMedals.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-light mb-8 border-b border-black dark:border-gray-700 pb-4 dark:text-white">
              🥈 Silver Medals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {silverMedals.map((competition, index) => (
                <CompetitionCard key={competition.id} competition={competition} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Bronze Medals */}
        {bronzeMedals.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-light mb-8 border-b border-black dark:border-gray-700 pb-4 dark:text-white">
              🥉 Bronze Medals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bronzeMedals.map((competition, index) => (
                <CompetitionCard key={competition.id} competition={competition} index={index} />
              ))}
            </div>
          </div>
        )}

        {competitions.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">No competitions found.</p>
        )}
      </section>
    </Layout>
  );
}
