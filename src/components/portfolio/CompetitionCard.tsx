import Link from 'next/link';
import Image from 'next/image';
import { Competition } from '@/types/portfolio.types';
import { Card, CardBody, CardFooter } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

interface CompetitionCardProps {
  competition: Competition;
  index: number;
}

export function CompetitionCard({ competition, index }: CompetitionCardProps) {
  // If there's a related project, we link to that, otherwise to the competition detail
  const targetHref = competition.relatedProjects && competition.relatedProjects.length > 0
    ? `/projects/${competition.relatedProjects[0].replace(/^\d+\./, '')}`
    : `/competitions/${competition.slug}`;

  return (
    <Link href={targetHref} className="group block h-full">
      <Card delay={index * 0.1} className="h-full flex flex-col border border-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        {/* Award Badge */}
        <div className="mb-4">
          <Badge variant="default" className="text-[10px] py-0.5">{competition.award || 'Achievement'}</Badge>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-light dark:text-white group-hover:underline decoration-1 underline-offset-4">
            {competition.competitionName || competition.title}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-xs font-mono text-gray-500 dark:text-gray-400">
            <span>{competition.date}</span>
            <span>•</span>
            <span className="uppercase">{competition.scope || 'National'}</span>
          </div>
        </div>

        {competition.previewImage && (
          <div className="relative w-full h-48 mb-6 overflow-hidden border border-black/10 dark:border-white/10">
            <Image
              src={competition.previewImage}
              alt={competition.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          </div>
        )}

        <CardBody className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
            {competition.shortDescription}
          </p>
        </CardBody>

        <CardFooter className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <span className="text-xs font-mono uppercase tracking-widest flex items-center gap-2">
            {competition.relatedProjects && competition.relatedProjects.length > 0 ? 'View Project Implementation' : 'View Achievement'} 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
