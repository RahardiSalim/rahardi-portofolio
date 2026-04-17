import { notFound } from 'next/navigation';
import { loadPortfolioData } from '@/lib/data';
import { ExperienceDetail } from './_components/ExperienceDetail';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const { experiences } = await loadPortfolioData();
  return experiences.map((e) => ({ slug: e.id }));
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { experiences } = await loadPortfolioData();
  const experience = experiences.find((e) => e.id === params.slug);

  if (!experience) notFound();

  return <ExperienceDetail experience={experience} />;
}
