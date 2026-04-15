'use client';

import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import type { Project } from '@/types/portfolio.types';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        setProjects(data.projects);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container-custom section-spacing min-h-[60vh] flex items-center justify-center">
           <div className="animate-pulse font-mono uppercase tracking-widest">Loading Projects...</div>
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
          <h1 className="text-6xl md:text-8xl font-black mb-8 dark:text-white tracking-tighter uppercase">Project<br />Archive</h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl font-light leading-relaxed">
              A curated selection of technical implementations, research findings, and AI-driven solutions developed through years of exploration in Data Science.
            </p>
            <div className="text-xs font-mono uppercase tracking-widest text-gray-400">
               Showing {projects.length} Case Studies
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-32 border-2 border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 font-mono uppercase tracking-widest">No projects indexed yet.</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
