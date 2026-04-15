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
    async function fetchData() {
      try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        setFeaturedProjects(data.projects.slice(0, 3));
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
        <div className="container-custom section-spacing min-h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-black dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
            <p className="font-mono text-xs animate-pulse uppercase tracking-widest">Loading Portfolio...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="container-custom section-spacing pt-24 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
               <span className="w-8 h-[1px] bg-black dark:bg-white" />
               <Badge variant="outline">Data Science & AI Engineer</Badge>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 dark:text-white leading-[0.9] tracking-tighter uppercase">
              RAHARDI<br />SALIM
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-800 dark:text-gray-300 max-w-2xl font-light leading-relaxed">
              Specialist in <span className="font-mono font-bold italic">Machine Learning</span>, 
              NLP, and Computer Vision. Currently pursuing Computer Science at University of Indonesia.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link
                href="/projects"
                className="group relative inline-block bg-black dark:bg-white text-white dark:text-black px-10 py-5 text-sm font-mono uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
              >
                View Projects
              </Link>
              <a
                href="mailto:rahardisalim23@gmail.com"
                className="inline-block border border-black dark:border-white text-black dark:text-white px-10 py-5 text-sm font-mono uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <HeroImage />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container-custom py-24 border-t border-black dark:border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <Stat number="07" label="Competition Wins" />
          <Stat number="12" label="Major Projects" />
          <Stat number="06" label="Tech Roles" />
          <Stat number="04" label="Specializations" />
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="container-custom section-spacing">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase dark:text-white">Selected Works</h2>
            <p className="text-gray-600 dark:text-gray-400 font-light">Featured projects in AI & Machine Learning</p>
          </div>
          <Link href="/projects" className="text-sm font-mono uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:text-gray-500 dark:hover:text-gray-400 transition-all dark:text-white">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* Career Timeline */}
      <section className="bg-gray-50 dark:bg-gray-800 w-full py-32">
        <div className="container-custom">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase dark:text-white">Career Path</h2>
            <p className="text-gray-600 dark:text-gray-400 font-light">Professional experience and milestones</p>
          </div>
          <CareerTimeline />
        </div>
      </section>

      {/* Top Competitions */}
      <section className="container-custom section-spacing">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase dark:text-white">Award Highlights</h2>
            <p className="text-gray-600 dark:text-gray-400 font-light">National & international recognition</p>
          </div>
          <Link href="/competitions" className="text-sm font-mono uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:text-gray-500 dark:hover:text-gray-400 transition-all dark:text-white">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topCompetitions.map((competition, index) => (
            <CompetitionCard key={competition.id} competition={competition} index={index} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-32 border-t border-black dark:border-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase dark:text-white">Let&apos;s Work Together</h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 font-light leading-relaxed">
            Interested in collaboration or want to discuss AI/ML projects? I&apos;m always open to new challenges and interesting conversations.
          </p>
          <a
            href="mailto:rahardisalim23@gmail.com"
            className="inline-block bg-black dark:bg-white text-white dark:text-black px-12 py-6 text-sm font-mono uppercase tracking-widest hover:scale-105 transition-all duration-300"
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
    <div className="group">
      <div className="text-6xl font-black mb-2 dark:text-white tracking-tighter group-hover:text-blue-600 transition-colors duration-500">
        {number}
      </div>
      <div className="text-xs uppercase tracking-widest font-mono text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}
