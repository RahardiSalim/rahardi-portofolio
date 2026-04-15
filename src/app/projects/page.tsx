'use client';

import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import type { Project } from '@/types/portfolio.types';

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
        <div className="container-custom section-spacing">
          <div className="animate-pulse">Loading projects...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container-custom section-spacing">
        <div className="mb-16">
          <h1 className="heading-xl mb-6 dark:text-white">Projects</h1>
          <p className="body-lg text-gray-800 dark:text-gray-300 max-w-2xl">
            A collection of my work in machine learning, data science, and AI — 
            from research prototypes to production systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">No projects found.</p>
        )}
      </section>
    </Layout>
  );
}
