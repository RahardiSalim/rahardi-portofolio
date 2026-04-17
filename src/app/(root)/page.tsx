import { loadPortfolioData } from '@/lib/data';
import { HomeHero } from './_components/HomeHero';
import { HomeStats } from './_components/HomeStats';
import { HomeTimeline } from './_components/HomeTimeline';
import { HomeFeaturedProjects } from './_components/HomeFeaturedProjects';
import { HomeTopCompetitions } from './_components/HomeTopCompetitions';
import { HomeCTA } from './_components/HomeCTA';

export default async function HomePage() {
  const { projects, competitions, experiences } = await loadPortfolioData();

  return (
    <>
      <HomeHero />
      <HomeStats />
      <HomeTimeline experiences={experiences} />
      <HomeFeaturedProjects projects={projects.slice(0, 3)} />
      <HomeTopCompetitions competitions={competitions.slice(0, 4)} />
      <HomeCTA />
    </>
  );
}
