import { loadPortfolioData } from '@/lib/data';
import { ProjectCard } from '@/components/sections/projects';

export default async function ProjectsPage() {
  const { projects } = await loadPortfolioData();

  return (
    <section className="container-custom section-spacing">
      <div className="mb-16">
        <h1 className="heading-xl mb-6 dark:text-white">Projects</h1>
        <p className="body-lg text-gray-800 dark:text-gray-300 max-w-2xl">
          A collection of ML, NLP, and data engineering projects ranging from academic research to
          production systems.
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
