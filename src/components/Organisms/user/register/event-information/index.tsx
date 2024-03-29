'use client';

import { Stack } from '@mantine/core';

import CardListItem from '@/components/Molecules/card-list-item';
import CardListItemDescription from '@/components/Molecules/card-list-item-description';
import CardListItemTitle from '@/components/Molecules/card-list-item-title';
import type { ParticipationMethod } from '@/enums/constants';
import { EventType } from '@/enums/constants';
import { participationMethodToString } from '@/lib/utils/converter';
import type { Competition, Event, Seminar } from '@/types/technofest';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  event: Event<Seminar | Competition>;
  participationMethod: ParticipationMethod | undefined;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function RegisterEventInformation(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { event, participationMethod } = props;

  const competition = event.eventable_type === EventType.COMPETITION ? (event as Event<Competition>) : undefined;
  // const seminar = event.eventable_type === EventType.SEMINAR ? (event as Event<Seminar>) : undefined;

  return (
    <CardListItem>
      <CardListItemTitle>{event.name}</CardListItemTitle>
      <Stack spacing={2} mt={6}>
        {competition && (
          <CardListItemDescription>
            Peserta:&nbsp;
            {competition.eventable?.max_participants && competition.eventable?.max_participants > 1
              ? `Tim - maks ${competition.eventable?.max_participants} peserta`
              : 'Individual'}
          </CardListItemDescription>
        )}
        <CardListItemDescription>
          Biaya:&nbsp;Gratis
          {/*{seminar*/}
          {/*  ? participationMethod === ParticipationMethod.OFFLINE*/}
          {/*    ? `${formatPrice(seminar.eventable?.offline_price as number)} (${participationMethodToString(participationMethod)})`*/}
          {/*    : `${formatPrice(seminar.eventable?.online_price as number)} (${participationMethodToString(participationMethod)})`*/}
          {/*  : formatPrice(event.price!)}*/}
        </CardListItemDescription>
        <CardListItemDescription>Metode partisipasi: {participationMethod && participationMethodToString(participationMethod)}</CardListItemDescription>
      </Stack>
    </CardListItem>
  );
}
