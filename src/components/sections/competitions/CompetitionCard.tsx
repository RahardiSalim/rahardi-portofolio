import Link from 'next/link';
import type { Competition } from '@/types';
import { Card, CardBody, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MediaImage } from '@/components/common/MediaImage';

interface CompetitionCardProps {
  competition: Competition;
  index: number;
}

export function CompetitionCard({ competition, index }: CompetitionCardProps) {
  const href = `/competitions/${competition.slug}`;
  const projectSlug = competition.relatedProjects?.[0] ?? null;

  return (
    <Card
      delay={index * 0.1}
      className="h-full flex flex-col border border-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors overflow-hidden"
    >
      {competition.previewImage && (
        <Link href={href} className="group block">
          <MediaImage
            src={competition.previewImage}
            alt={competition.title}
            className="w-full h-52 border-b border-black/10 dark:border-white/10"
            imageClassName="group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <Badge variant="default" className="text-[10px] py-0.5">
            {competition.award || 'Achievement'}
          </Badge>
        </div>

        <Link href={href} className="group block mb-4">
          <h3 className="text-xl font-light dark:text-white group-hover:underline decoration-1 underline-offset-4">
            {competition.competitionName || competition.title}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-xs font-mono text-gray-500 dark:text-gray-400">
            <span>{competition.date}</span>
            <span>•</span>
            <span className="uppercase">{competition.scope || 'National'}</span>
          </div>
        </Link>

        <CardBody className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
            {competition.shortDescription}
          </p>
        </CardBody>

        <CardFooter className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
          <Link
            href={href}
            className="group flex justify-between items-center text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <span>View Achievement</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          {projectSlug && (
            <Link
              href={`/projects/${projectSlug}`}
              className="flex justify-between items-center px-3 py-2 bg-blue-600 text-white text-xs font-mono uppercase tracking-widest hover:bg-blue-700 transition-colors"
            >
              <span>View Project</span>
              <span>↗</span>
            </Link>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
