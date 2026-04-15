import Link from 'next/link';
import { Competition } from '@/types/portfolio.types';
import { Card, CardBody, CardFooter } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

interface CompetitionCardProps {
  competition: Competition;
  index: number;
}

export function CompetitionCard({ competition, index }: CompetitionCardProps) {
  return (
    <Link href={`/competitions/${competition.slug}`} className="group block h-full">
      <Card delay={index * 0.1} className="h-full flex flex-col border-2 border-black dark:border-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        {/* Award Badge - Prominent */}
        <div className="mb-4">
          <Badge>{competition.award || 'Achievement'}</Badge>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold dark:text-white group-hover:underline decoration-2 underline-offset-4">
            {competition.competitionName || competition.title}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-xs font-mono text-gray-500 dark:text-gray-400">
            <span>{competition.date}</span>
            <span>•</span>
            <span className="uppercase">{competition.scope || 'National'}</span>
          </div>
        </div>

        <CardBody className="flex-1">
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4 leading-relaxed italic">
            &quot;{competition.shortDescription}&quot;
          </p>
          
          {/* Achievement summary if available in metadata or first few lines of long description */}
          <div className="mt-4 space-y-2">
            <div className="h-px bg-gray-200 dark:bg-gray-700 w-12" />
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500">The Story</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
              Explore the journey and key takeaways from this achievement.
            </p>
          </div>
        </CardBody>

        <CardFooter className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <span className="text-xs font-mono uppercase tracking-tighter group-hover:translate-x-1 transition-transform flex items-center gap-2">
            Read Full Story <span className="text-lg">→</span>
          </span>
          {competition.relatedProjects && competition.relatedProjects.length > 0 && (
            <Badge variant="outline">Project Linked</Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
