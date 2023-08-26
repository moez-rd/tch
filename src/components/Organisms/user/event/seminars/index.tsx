'use client';

import { Badge, Button, Flex, Group, Stack, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconPointFilled } from '@tabler/icons-react';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';

import Container from '@/components/Atoms/container';
import CardListBase from '@/components/Molecules/card-list-base';
import CardListItem from '@/components/Molecules/card-list-item';
import CardListItemDescription from '@/components/Molecules/card-list-item-description';
import CardListItemTitle from '@/components/Molecules/card-list-item-title';
import ModalCreateSeminarRegistration from '@/components/Molecules/modal-create-seminar-registration';
import Paragraph from '@/components/Molecules/paragraph';
import SectionHeader from '@/components/Molecules/section-header';
import { paths } from '@/config/paths';
import { createSeminarRegistrationModalState } from '@/lib/recoil/createSeminarRegistrationAtom';
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

  const setCreateSeminarEventRegistration = useSetRecoilState(createSeminarRegistrationModalState);

  const handleRegisterButtonClick = (seminar: Event<Seminar>) => {
    setCreateSeminarEventRegistration({
      opened: true,
      eventCodename: seminar.codename,
    });
  };

  const theme = useMantineTheme();

  const maxSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Container small>
      <SectionHeader title="Seminar" secondary />
      <CardListBase>
        {seminars.map((seminar) => (
          <CardListItem key={seminar.id}>
            <Flex direction={maxSm ? 'column' : 'row'} justify="space-between" align={maxSm ? '' : 'end'} gap="sm">
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
                  <CardListItemDescription>Offline: {formatPrice(seminar.eventable?.offline_price || 0)}</CardListItemDescription>
                  <IconPointFilled size="10" />
                  <CardListItemDescription>Online: {formatPrice(seminar.eventable?.online_price || 0)}</CardListItemDescription>
                </Group>
              </Stack>
              <Group spacing="xs" sx={{ alignSelf: 'end' }}>
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
                  <Button px="md" radius="xl" compact onClick={() => handleRegisterButtonClick(seminar)}>
                    Ikuti
                  </Button>
                )}
              </Group>
            </Flex>
          </CardListItem>
        ))}

        {seminars.length === 0 && (
          <Paragraph my="2rem" ta="center">
            Tidak ada seminar yang tersedia
          </Paragraph>
        )}
      </CardListBase>

      <ModalCreateSeminarRegistration />
    </Container>
  );
}
