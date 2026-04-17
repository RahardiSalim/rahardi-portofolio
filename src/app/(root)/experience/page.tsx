import { loadPortfolioData } from '@/lib/data';
import { ExperienceCard } from '@/components/sections/experience';

export default async function ExperiencePage() {
  const { experiences } = await loadPortfolioData();

  return (
    <section className="container-custom section-spacing">
      <div className="mb-16">
        <h1 className="heading-xl mb-6 dark:text-white">Experience</h1>
        <p className="body-lg text-gray-800 dark:text-gray-300 max-w-2xl">
          Professional experience spanning AI research, data engineering, and technical leadership
          across academia and industry.
        </p>
      </div>

      {experiences.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No experience found.</p>
      ) : (
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
