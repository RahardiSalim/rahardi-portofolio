import { loadPortfolioData } from '@/lib/data';
import { CompetitionCard } from '@/components/sections/competitions';

export default async function CompetitionsPage() {
  const { competitions } = await loadPortfolioData();

  return (
    <section className="container-custom section-spacing">
      <div className="mb-16">
        <h1 className="heading-xl mb-6 dark:text-white">Competitions &amp; Awards</h1>
        <p className="body-lg text-gray-800 dark:text-gray-300 max-w-2xl">
          Recognition from national competitions in data science, machine learning, and AI innovation.
        </p>
      </div>

      {competitions.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No competitions found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {competitions.map((comp, index) => (
            <CompetitionCard key={comp.id} competition={comp} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
