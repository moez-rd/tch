import BaseContainer from '@/components/Atoms/base-container';
import HomeAbout from '@/components/Organisms/home/about';
import HomeAgenda from '@/components/Organisms/home/agenda';
import HomeBrandAlignments from '@/components/Organisms/home/brand-alignments';
import HomeCompetitions from '@/components/Organisms/home/competitions';
import HomeFaqs from '@/components/Organisms/home/faqs';
import HomeHero from '@/components/Organisms/home/hero';
import HomeSeminar from '@/components/Organisms/home/seminar';
import { technofest } from '@/config/technofest';
import { competitionsGetAll, festivalGetCurrent, seminarsGetByCodename } from '@/lib/fetch/v1';
import type { Event, Festival, Milestone, Seminar } from '@/types/technofest';

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

  const festival = await festivalGetCurrent();
  const competitions = await competitionsGetAll();
  const seminar = await seminarsGetByCodename(technofest.seminarCodename);

  return (
    <BaseContainer>
      <HomeHero />
      <HomeAbout />
      <HomeCompetitions competitions={competitions.data!} />
      <HomeSeminar seminar={seminar.data as Event<Seminar>} />
      <HomeAgenda milestones={festival.data?.milestones as Milestone<Festival>[]} />
      <HomeFaqs />
      <HomeBrandAlignments />
    </BaseContainer>
  );
}
