import { loadPortfolioData } from '@/lib/data';
import { ExperienceTimeline } from '@/components/sections/experience';

export default async function ExperiencePage() {
  const { experiences } = await loadPortfolioData();
  const professionalExperiences = experiences.filter(
    (experience) => experience.category === 'professional'
  );
  const organizationExperiences = experiences.filter(
    (experience) => experience.category === 'organization'
  );

  return (
    <section className="container-custom section-spacing">
      <div className="mb-16">
        <h1 className="heading-xl mb-6 dark:text-white">Experience</h1>
        <p className="body-lg text-gray-800 dark:text-gray-300 max-w-2xl">
          Professional roles and organization leadership across AI research, data engineering,
          education, and student communities.
        </p>
      </div>

      {experiences.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No experience found.</p>
      ) : (
        <div className="space-y-24">
          <section>
            <div className="mb-10">
              <p className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
                Professional
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase dark:text-white">
                Professional Experience
              </h2>
            </div>
            {professionalExperiences.length > 0 ? (
              <ExperienceTimeline experiences={professionalExperiences} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No professional experience found.</p>
            )}
          </section>

          <section>
            <div className="mb-10">
              <p className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
                Organization
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase dark:text-white">
                Organization Experience
              </h2>
            </div>
            {organizationExperiences.length > 0 ? (
              <ExperienceTimeline experiences={organizationExperiences} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No organization experience found.</p>
            )}
          </section>
        </div>
      )}
    </section>
  );
}
