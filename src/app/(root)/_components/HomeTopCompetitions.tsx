import Link from 'next/link';
import type { Competition } from '@/types';
import { CompetitionCard } from '@/components/sections/competitions';

interface HomeTopCompetitionsProps {
  competitions: Competition[];
}

export function HomeTopCompetitions({ competitions }: HomeTopCompetitionsProps) {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 w-full py-32">
      <div className="container-custom">
        <div className="mb-16 flex items-center justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase dark:text-white">
              🏆 Award Recognition
            </h2>
            <p className="text-gray-600 dark:text-gray-400">National competitions and innovation challenges.</p>
          </div>
          <Link
            href="/competitions"
            className="text-sm font-mono uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:text-gray-500 dark:hover:text-gray-400 transition-all dark:text-white"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {competitions.map((comp, index) => (
            <CompetitionCard key={comp.id} competition={comp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
