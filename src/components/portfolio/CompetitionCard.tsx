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
  return (
    <Link href={`/competitions/${competition.slug}`}>
      <Card delay={index * 0.1}>
        {/* Preview image banner */}
        {competition.previewImage && (
          <div className="relative w-full h-44 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-4 overflow-hidden">
            <Image
              src={competition.previewImage}
              alt={competition.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            {/* Award overlay */}
            {competition.award && (
              <div className="absolute top-3 left-3">
                <span className="bg-black/80 dark:bg-white/90 text-white dark:text-black text-xs font-mono px-2 py-1 uppercase tracking-wider">
                  {competition.award}
                </span>
              </div>
            )}
          </div>
        )}
        {/* No image: just show award badge inline */}
        {!competition.previewImage && competition.award && (
          <div className="mb-2">
            <span className="inline-block text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400">
              {competition.award}
            </span>
          </div>
        )}

        <div className="mb-1">
          <h3 className="heading-sm dark:text-white line-clamp-2">{competition.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-mono mt-1">{competition.date}</p>
        </div>

        <CardBody>
          <p className="line-clamp-3">{competition.shortDescription}</p>
        </CardBody>

        <CardFooter>
          <Badge variant="outline">{competition.scope?.toUpperCase() || 'COMPETITION'}</Badge>
          <span className="ml-auto text-xs font-mono group-hover:translate-x-1 transition-transform">
            →
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
