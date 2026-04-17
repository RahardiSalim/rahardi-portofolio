import Link from 'next/link';
import type { Experience } from '@/types';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const dateRange = experience.endDate
    ? `${experience.startDate} - ${experience.endDate}`
    : `${experience.startDate} - Present`;

  return (
    <Link href={`/experience/${experience.slug}`} className="group block">
      <Card
        delay={index * 0.1}
        className="hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        <CardHeader
          title={experience.position}
          subtitle={`${experience.organization} · ${dateRange}`}
        />
        <CardBody>
          <p className="mb-4">{experience.shortDescription}</p>
          {experience.achievements.length > 0 && (
            <ul className="space-y-2 text-sm">
              {experience.achievements.slice(0, 3).map((achievement, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-gray-400">—</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-500">View Details</span>
            <span className="text-blue-500">→</span>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
