import BaseContainer from '@/components/Atoms/base-container';
import EventAgenda from '@/components/Organisms/event/agenda';
import EventContactPersons from '@/components/Organisms/event/contact-persons';
import EventHeader from '@/components/Organisms/event/header';
import EventSeminarCasts from '@/components/Organisms/event/seminar-casts';

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
export default async function EventPage(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return (
    <BaseContainer>
      <EventHeader />
      <EventSeminarCasts />
      <EventAgenda />
      <EventContactPersons />
    </BaseContainer>
  );
}
