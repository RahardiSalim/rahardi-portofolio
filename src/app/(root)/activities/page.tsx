import { loadPortfolioData } from '@/lib/data';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';

export default async function ActivitiesPage() {
  const { activities } = await loadPortfolioData();

  return (
    <section className="container-custom section-spacing">
      <div className="mb-16">
        <h1 className="heading-xl mb-6 dark:text-white">Activities</h1>
        <p className="body-lg text-gray-800 dark:text-gray-300 max-w-2xl">
          Community involvement, workshops, speaking engagements, and organizational roles.
        </p>
      </div>

      {activities.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No activities found.</p>
      ) : (
        <div className="space-y-6">
          {activities.map((activity) => (
            <Link
              key={activity.id}
              href={`/activities/${activity.id}`}
              className="block group card-minimal p-8 hover:border-black dark:hover:border-white transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                    {activity.organization}
                  </p>
                  <h2 className="text-xl font-bold dark:text-white group-hover:underline mb-3">
                    {activity.title}
                  </h2>
                  {activity.role && <Badge variant="outline">{activity.role}</Badge>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
