'use client';

import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ExperienceCard } from '@/components/portfolio/ExperienceCard';
import type { Experience } from '@/types/portfolio.types';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        setExperiences(data.experiences);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch experiences:', error);
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container-custom section-spacing">
          <div className="animate-pulse">Loading experience...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container-custom section-spacing">
        <div className="mb-16">
          <h1 className="heading-xl mb-6 dark:text-white">Experience</h1>
          <p className="body-lg text-gray-800 dark:text-gray-300 max-w-2xl">
            Professional experience spanning AI research, data engineering, and technical leadership 
            across academia and industry.
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>

        {experiences.length === 0 && (
          <p className="text-center text-gray-500 py-12">No experience found.</p>
        )}
      </section>
    </Layout>
  );
}
