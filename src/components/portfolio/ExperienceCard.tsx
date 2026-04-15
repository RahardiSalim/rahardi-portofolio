import { Experience } from '@/types/portfolio.types';
import { Card, CardHeader, CardBody } from '@/components/common/Card';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const formatDateRange = () => {
    const start = experience.startDate;
    const end = experience.endDate || 'Present';
    return `${start} - ${end}`;
  };

  return (
    <Card delay={index * 0.1}>
      <CardHeader
        title={experience.position}
        subtitle={`${experience.organization} • ${formatDateRange()}`}
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
      </CardBody>
    </Card>
  );
}
