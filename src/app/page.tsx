import BaseContainer from '@/components/Atoms/base-container';
import HomeAbout from '@/components/Organisms/home/about';
import HomeAgenda from '@/components/Organisms/home/agenda';
import HomeBrandAlignments from '@/components/Organisms/home/brand-alignments';
import HomeCompetitions from '@/components/Organisms/home/competitions';
import HomeFaqs from '@/components/Organisms/home/faqs';
import HomeHero from '@/components/Organisms/home/hero';
import { technofest } from '@/config/technofest';
import { competitionsGetAll, festivalGetCurrent, seminarsGetByCodename } from '@/lib/fetch/v1';
import type { Festival, Milestone } from '@/types/technofest';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {}

/**
 * React page
 *
 * @param props
 * @returns
 */
export default async function HomePage(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  const festivalData = festivalGetCurrent();
  const competitionsData = competitionsGetAll();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const seminarData = seminarsGetByCodename(technofest.seminarCodename);

  const [festival, competitions, seminar] = await Promise.all([festivalData, competitionsData, seminarData]);

  return (
    <BaseContainer>
      <HomeHero />
      <HomeAbout />
      <HomeCompetitions competitions={competitions.data!} />
      {/*<HomeSeminar seminar={seminar.data as Event<Seminar>} />*/}
      <HomeAgenda milestones={festival.data?.milestones as Milestone<Festival>[]} />
      <HomeFaqs />
      <HomeBrandAlignments />
    </BaseContainer>
  );
}
