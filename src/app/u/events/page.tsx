import BaseContainer from '@/components/Atoms/base-container';
import EventCompetitions from '@/components/Organisms/user/event/competitions';
import EventHeader from '@/components/Organisms/user/event/header';
import EventSeminars from '@/components/Organisms/user/event/seminars';
import { EventType } from '@/enums/constants';
import { redirectIfNotAuthenticated, redirectIfUserNotHasProfile } from '@/lib/auth/redirect';
import { getServerSanctumToken } from '@/lib/auth/token';
import { userGetAllEvents } from '@/lib/fetch/v1';
import type { Competition, Event, Seminar } from '@/types/technofest';

/**
 * Props interface
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {}

/**
 * React page
 *
 * @param props
 * @returns
 */
export default async function RegisterPage(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  await redirectIfNotAuthenticated();

  await redirectIfUserNotHasProfile();

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  await sleep(1000);

  const events = await userGetAllEvents(getServerSanctumToken() as string);

  const competitions: Event<Competition>[] = events.data?.filter(
    (event) => event.eventable_type === EventType.COMPETITION && Number(event.is_opened)
  ) as Event<Competition>[];

  const seminars: Event<Seminar>[] = events.data?.filter((event) => event.eventable_type === EventType.SEMINAR && Number(event.is_opened)) as Event<Seminar>[];

  return (
    <BaseContainer>
      <EventHeader />
      <EventCompetitions competitions={competitions} />
      <EventSeminars seminars={seminars} />
    </BaseContainer>
  );
}
