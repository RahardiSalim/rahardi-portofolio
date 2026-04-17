import { notFound } from 'next/navigation';
import { loadPortfolioData } from '@/lib/data';
import { ProjectDetail } from './_components/ProjectDetail';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const { projects } = await loadPortfolioData();
  return projects.map((p) => ({ slug: p.id }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { projects } = await loadPortfolioData();
  const project = projects.find((p) => p.id === params.slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
