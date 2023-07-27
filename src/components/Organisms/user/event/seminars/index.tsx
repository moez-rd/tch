'use client';

import { Badge, Button, Group, Stack } from '@mantine/core';
import Link from 'next/link';

import Container from '@/components/Atoms/container';
import CardListBase from '@/components/Molecules/card-list-base';
import CardListItem from '@/components/Molecules/card-list-item';
import CardListItemDescription from '@/components/Molecules/card-list-item-description';
import CardListItemTitle from '@/components/Molecules/card-list-item-title';
import SectionHeader from '@/components/Molecules/section-header';
import { paths } from '@/config/paths';
import { useCreateRegistration } from '@/lib/hooks/useCreateRegistration';
import { formatPrice } from '@/lib/utils';
import { route } from '@/lib/utils/path';
import type { Event, Seminar } from '@/types/technofest';

interface Props {
  seminars: Event<Seminar>[];
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function EventSeminars(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { seminars } = props;

  const { createRegistration, loading } = useCreateRegistration();

  const handleRegisterButtonClick = (seminar: Event<Seminar>) => {
    createRegistration(seminar.codename);
  };

  return (
    <Container small>
      <SectionHeader title="Seminar" secondary />
      <CardListBase>
        {seminars.map((seminar) => (
          <CardListItem key={seminar.id}>
            <Group position="apart" align="end">
              <Stack spacing={0}>
                <Group spacing="xs">
                  <CardListItemTitle>{seminar.name}</CardListItemTitle>
                  {seminar.event_registrations?.length === 1 && (
                    <Badge variant="light" size="sm">
                      Diikuti
                    </Badge>
                  )}
                </Group>
                <Group spacing={6}>
                  <CardListItemDescription>{formatPrice(seminar.price || 0)}</CardListItemDescription>
                </Group>
              </Stack>
              <Group spacing="xs">
                <Button
                  px="md"
                  compact
                  variant="light"
                  color="blue"
                  radius="xl"
                  component={Link}
                  href={route(paths.eventDetail, { eventCodename: seminar.codename as string })}
                >
                  Info
                </Button>
                {seminar.event_registrations && seminar.event_registrations?.length > 0 ? (
                  <Button
                    px="md"
                    radius="xl"
                    variant="outline"
                    component={Link}
                    compact
                    href={route(paths.userEventRegisration, { eventCodename: seminar.codename })}
                  >
                    Detail
                  </Button>
                ) : (
                  <Button px="md" radius="xl" compact onClick={() => handleRegisterButtonClick(seminar)} loading={loading}>
                    Ikuti
                  </Button>
                )}
              </Group>
            </Group>
          </CardListItem>
        ))}
      </CardListBase>
    </Container>
  );
}