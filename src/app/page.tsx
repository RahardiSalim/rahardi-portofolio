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
import type { Project, Competition, Activity, Certification } from '@/types/portfolio.types';

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [topCompetitions, setTopCompetitions] = useState<Competition[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        setFeaturedProjects(data.projects.slice(0, 3));
        setTopCompetitions(data.competitions.slice(0, 4));
        setActivities(data.activities || []);
        setCertifications(data.certifications || []);
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
            
            <p className="text-xl md:text-2xl mb-10 text-gray-800 dark:text-gray-300 max-w-2xl font-light leading-relaxed">
              Specialist in <span className="font-mono font-bold italic">Machine Learning</span>, 
              NLP, and Computer Vision. Currently pursuing Computer Science at University of Indonesia.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
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

            {/* Social links */}
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="https://www.linkedin.com/in/rahardi-salim"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-black dark:hover:border-white pb-0.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <a
                href="https://github.com/RahardiSalim"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-black dark:hover:border-white pb-0.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <a
                href="/assets/RahardiSalim_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-black dark:hover:border-white pb-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                Resume
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

      {/* Top Competitions */}
      <section className="bg-gray-50 dark:bg-gray-800 w-full py-32">
        <div className="container-custom">
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
        </div>
      </section>

      {/* Certifications + Activities side by side */}
      <section className="container-custom section-spacing">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Certifications */}
          <div>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-black mb-2 tracking-tighter uppercase dark:text-white">Certifications</h2>
                <p className="text-gray-600 dark:text-gray-400 font-light text-sm">Professional credentials</p>
              </div>
              <Link href="/certifications" className="text-xs font-mono uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:text-gray-500 dark:hover:text-gray-400 transition-all dark:text-white">
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {certifications.slice(0, 3).map((cert) => (
                <Link key={cert.id} href={`/certifications/${cert.slug}`} className="block border border-black dark:border-gray-700 p-5 hover:border-blue-500 dark:hover:border-blue-400 transition-colors group">
                  <div className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-1">{cert.issuer}</div>
                  <div className="font-bold text-sm dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cert.title}</div>
                  {cert.shortDescription && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed line-clamp-2">{cert.shortDescription}</div>
                  )}
                  <div className="text-xs font-mono text-gray-400 mt-2">{cert.date}</div>
                </Link>
              ))}
              {certifications.length === 0 && (
                <p className="text-sm text-gray-400 font-mono">No certifications yet.</p>
              )}
            </div>
          </div>

          {/* Activities */}
          <div>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-black mb-2 tracking-tighter uppercase dark:text-white">Activities</h2>
                <p className="text-gray-600 dark:text-gray-400 font-light text-sm">Community & speaking</p>
              </div>
              <Link href="/activities" className="text-xs font-mono uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:text-gray-500 dark:hover:text-gray-400 transition-all dark:text-white">
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {activities.slice(0, 4).map((activity) => (
                <Link key={activity.id} href={`/activities/${activity.slug}`} className="block border border-black dark:border-gray-700 p-5 hover:border-blue-500 dark:hover:border-blue-400 transition-colors group">
                  <div className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-1">{activity.organization}</div>
                  <div className="font-bold text-sm dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{activity.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.role} · {activity.date}</div>
                </Link>
              ))}
              {activities.length === 0 && (
                <p className="text-sm text-gray-400 font-mono">No activities yet.</p>
              )}
            </div>
          </div>
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
