'use client';

import { Stack } from '@mantine/core';

import CardListItem from '@/components/Molecules/card-list-item';
import CardListItemDescription from '@/components/Molecules/card-list-item-description';
import CardListItemTitle from '@/components/Molecules/card-list-item-title';
import { EventType } from '@/enums/constants';
import { formatPrice } from '@/lib/utils';
import type { Competition, Event, Seminar } from '@/types/technofest';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  event: Event<Seminar | Competition>;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function RegisterEventInformation(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { event } = props;

  const competition = event.eventable_type === EventType.COMPETITION ? (event as Event<Competition>) : undefined;

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
        <CardListItemDescription>Biaya: {formatPrice(event.price!)}</CardListItemDescription>
      </Stack>
    </CardListItem>
  );
}
