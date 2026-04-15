'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { CompetitionCard } from '@/components/portfolio/CompetitionCard';
import { Badge } from '@/components/common/Badge';
import { HeroImage } from '@/components/common/HeroImage';
import { CareerTimeline } from '@/components/common/CareerTimeline';
import type { Project, Competition } from '@/types/portfolio.types';

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [topCompetitions, setTopCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data on component mount
    async function fetchData() {
      try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        
        // Featured projects (first 3)
        setFeaturedProjects(data.projects.slice(0, 3));
        
        // Top competitions (gold/silver)
        setTopCompetitions(data.competitions.slice(0, 4));
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container-custom section-spacing">
          <div className="animate-pulse">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="container-custom section-spacing">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <Badge>Data Science & AI Engineer</Badge>
            
            <h1 className="heading-xl mt-6 mb-6 dark:text-white">
              Rahardi Salim
            </h1>
            
            <p className="body-lg mb-8 text-gray-800 dark:text-gray-300 max-w-2xl">
              Specialist in machine learning, natural language processing, and computer vision. 
              Currently pursuing Computer Science at University of Indonesia.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-sm font-mono uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                View Projects
              </a>
              <a
                href="mailto:rahardisalim23@gmail.com"
                className="inline-block border border-black dark:border-white text-black dark:text-white px-8 py-4 text-sm font-mono uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <HeroImage />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container-custom pb-16 md:pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-black dark:border-gray-700 py-12">
          <Stat number="7" label="Competition Wins" />
          <Stat number="8" label="Major Projects" />
          <Stat number="6" label="Tech Roles" />
          <Stat number="4" label="Certifications" />
        </div>
      </section>

      {/* Career Timeline */}
      <section className="bg-gray-50 dark:bg-gray-800 w-full">
        <div className="container-custom section-spacing">
          <div className="mb-12">
            <h2 className="heading-lg mb-2 dark:text-white">Career Journey</h2>
            <p className="text-gray-600 dark:text-gray-400">Professional experience and milestones</p>
          </div>
          <CareerTimeline />
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="container-custom section-spacing">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="heading-lg mb-2">Selected Projects</h2>
            <p className="text-gray-600 dark:text-gray-400">Featured work in AI & ML</p>
          </div>
          <Link href="/projects" className="link-underline text-sm font-mono uppercase dark:text-gray-300">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* Top Competitions */}
      <section className="bg-gray-50 dark:bg-gray-800 w-full">
        <div className="container-custom section-spacing">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="heading-lg mb-2">Competition Achievements</h2>
              <p className="text-gray-600 dark:text-gray-400">National & international awards</p>
            </div>
            <Link href="/competitions" className="link-underline text-sm font-mono uppercase dark:text-gray-300">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topCompetitions.map((competition, index) => (
              <CompetitionCard key={competition.id} competition={competition} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom section-spacing">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border border-black dark:border-white p-12 md:p-16 text-center bg-white dark:bg-gray-800"
        >
          <h2 className="heading-md mb-6">Let&apos;s Work Together</h2>
          <p className="body-md mb-8 max-w-2xl mx-auto text-gray-800 dark:text-gray-300">\n            Interested in collaboration or want to discuss AI/ML projects? 
            I&apos;m always open to interesting conversations.
          </p>
          <a
            href="mailto:rahardisalim23@gmail.com"
            className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-sm font-mono uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </section>
    </Layout>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl md:text-5xl font-light mb-2 dark:text-white">{number}</div>
      <div className="text-xs uppercase tracking-widest font-mono text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}
