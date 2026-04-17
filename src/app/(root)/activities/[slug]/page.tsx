import { notFound } from 'next/navigation';
import { loadPortfolioData } from '@/lib/data';
import { ActivityDetail } from './_components/ActivityDetail';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const { activities } = await loadPortfolioData();
  return activities.map((a) => ({ slug: a.id }));
}

export default async function ActivityDetailPage({ params }: Props) {
  const { activities } = await loadPortfolioData();
  const activity = activities.find((a) => a.id === params.slug);

  if (!activity) notFound();

  return <ActivityDetail activity={activity} />;
}
