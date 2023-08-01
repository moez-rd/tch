import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BaseContainer from '@/components/Atoms/base-container';
import EventAgenda from '@/components/Organisms/event/agenda';
import EventContactPersons from '@/components/Organisms/event/contact-persons';
import EventHeader from '@/components/Organisms/event/header';
import EventSeminarCasts from '@/components/Organisms/event/seminar-casts';
import { appConfig } from '@/config/app';
import { EventType } from '@/enums/constants';
import { ErrorCode } from '@/enums/error-code';
import { competitionsGetByCodename, eventsGetByCodename, eventsGetEventableTypeByCodename, seminarsGetByCodename } from '@/lib/fetch/v1';
import type { Competition, ContactPerson, Event, Milestone, Seminar } from '@/types/technofest';

/**
 * Props interface
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  params: {
    codename: string;
  };
}

/**
 *
 * @param props
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  // eslint-disable-next-line no-empty-pattern
  const { params } = props;

  const event = await eventsGetByCodename(params.codename);

  return {
    title: `${event.data?.name} - ${appConfig.title}`,
  };
}

/**
 * React page
 *
 * @param props
 * @returns
 */
export default async function EventPage(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { params } = props;

  const eventType = await eventsGetEventableTypeByCodename(params.codename);

  if (eventType.status === 404 && eventType.error_code === ErrorCode.NOT_FOUND) {
    notFound();
  }

  async function getEvent() {
    if (eventType.data === EventType.COMPETITION) {
      return competitionsGetByCodename(params.codename);
    }

    return seminarsGetByCodename(params.codename);
  }

  const event = await getEvent();

  return (
    <BaseContainer>
      <EventHeader event={event.data as Event<Competition | Seminar>} />
      {eventType.data === EventType.SEMINAR && <EventSeminarCasts seminarCasts={(event.data?.eventable as Seminar).seminar_casts} />}
      <EventAgenda milestones={event.data?.milestones as Milestone<Event<Seminar | Competition>>[]} />
      <EventContactPersons contactPersons={event.data?.contact_persons as ContactPerson<Event<Seminar | Competition>>[]} />
    </BaseContainer>
  );
}
