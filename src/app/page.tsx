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
        
        // Logic: Featured projects (first 3)
        setFeaturedProjects(data.projects.slice(0, 3));
        
        // Logic: Top competitions (gold/silver/bronze)
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
            <div className="w-12 h-12 border-4 border-black dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
            <p className="font-mono text-sm animate-pulse uppercase tracking-widest">Loading Portfolio...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section - High Impact */}
      <section className="container-custom section-spacing pt-24 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-3 mb-6">
               <span className="w-8 h-[1px] bg-black dark:bg-white" />
               <Badge variant="outline">Data Science & AI Engineer</Badge>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 dark:text-white leading-[0.9] tracking-tighter">
              RAHARDI<br />SALIM
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-800 dark:text-gray-300 max-w-2xl font-light leading-relaxed">
              Architecting intelligent systems through <span className="font-mono font-bold italic underline decoration-blue-500 underline-offset-4">Machine Learning</span>, 
              NLP, and Computer Vision. Currently at the University of Indonesia.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link
                href="/projects"
                className="group relative inline-block bg-black dark:bg-white text-white dark:text-black px-10 py-5 text-sm font-mono uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all overflow-hidden"
              >
                <span className="relative z-10">Explore Work</span>
                <motion.div className="absolute inset-0 bg-blue-600 dark:bg-blue-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              <a
                href="mailto:rahardisalim23@gmail.com"
                className="inline-block border-2 border-black dark:border-white text-black dark:text-white px-10 py-5 text-sm font-mono uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group">
               <div className="absolute -inset-4 border-2 border-black dark:border-white translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
               <HeroImage />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Modular & Clean */}
      <section className="container-custom py-24 border-t border-black dark:border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <Stat number="07" label="Global Awards" sub="Winning mindset" />
          <Stat number="12" label="ML Projects" sub="Production ready" />
          <Stat number="06" label="Tech Roles" sub="Industry experience" />
          <Stat number="04" label="Specializations" sub="Deep expertise" />
        </div>
      </section>

      {/* Featured Projects - Case Study Focus */}
      <section id="projects" className="bg-black dark:bg-gray-950 text-white w-full py-32">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">Selected Works</h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                A collection of research, hackathons, and production-grade applications focusing on solving complex problems with AI.
              </p>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-4 text-sm font-mono uppercase tracking-widest border-b border-white pb-2 hover:text-blue-400 hover:border-blue-400 transition-all">
              View Repository <span className="text-xl">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Career Timeline - Narrative Focus */}
      <section className="bg-gray-50 dark:bg-gray-900 w-full py-32">
        <div className="container-custom">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase dark:text-white">Career Path</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-light leading-relaxed">
              My professional journey through academia and industry, focusing on research assistantships and engineering roles.
            </p>
          </div>
          <CareerTimeline />
        </div>
      </section>

      {/* Top Competitions - Achievement Story Focus */}
      <section className="container-custom py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase dark:text-white">Awards</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-light leading-relaxed">
              National and international recognition for excellence in data mining, software engineering, and AI innovation.
            </p>
          </div>
          <Link href="/competitions" className="inline-flex items-center gap-4 text-sm font-mono uppercase tracking-widest border-b border-black dark:border-white pb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-all dark:text-white">
            All Achievements <span className="text-xl">→</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {topCompetitions.map((competition, index) => (
            <CompetitionCard key={competition.id} competition={competition} index={index} />
          ))}
        </div>
      </section>

      {/* CTA Section - Minimal & Bold */}
      <section className="container-custom py-32 border-t border-black dark:border-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase dark:text-white">Start a Conversation</h2>
            <p className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-400 font-light leading-relaxed">
            Interested in collaboration or want to discuss the future of AI? I&apos;m always open to new challenges and interesting conversations.
          </p>
          <a
            href="mailto:rahardisalim23@gmail.com"
            className="group relative inline-block bg-black dark:bg-white text-white dark:text-black px-12 py-6 text-sm font-mono uppercase tracking-widest hover:scale-105 transition-all duration-300"
          >
            rahardisalim23@gmail.com
          </a>
        </motion.div>
      </section>
    </Layout>
  );
}

function Stat({ number, label, sub }: { number: string; label: string; sub: string }) {
  return (
    <div className="group">
      <div className="text-6xl md:text-7xl font-black mb-4 dark:text-white tracking-tighter group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500">
        {number}
      </div>
      <div className="text-sm uppercase tracking-widest font-mono font-bold dark:text-white mb-1">{label}</div>
      <div className="text-xs font-mono text-gray-500 dark:text-gray-400">{sub}</div>
    </div>
  );
}
