import { notFound } from 'next/navigation';
import { loadPortfolioData } from '@/lib/data';
import { CertificationDetail } from './_components/CertificationDetail';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const { certifications } = await loadPortfolioData();
  return certifications.map((c) => ({ slug: c.id }));
}

export default async function CertificationDetailPage({ params }: Props) {
  const { certifications } = await loadPortfolioData();
  const certification = certifications.find((c) => c.id === params.slug);

  if (!certification) notFound();

  return <CertificationDetail certification={certification} />;
}
