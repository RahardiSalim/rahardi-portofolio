import { notFound } from 'next/navigation';
import { loadPortfolioData } from '@/lib/data';
import { CompetitionDetail } from './_components/CompetitionDetail';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const { competitions } = await loadPortfolioData();
  return competitions.map((c) => ({ slug: c.id }));
}

export default async function CompetitionDetailPage({ params }: Props) {
  const { competitions } = await loadPortfolioData();
  const competition = competitions.find((c) => c.id === params.slug);

  if (!competition) notFound();

  return <CompetitionDetail competition={competition} />;
}
