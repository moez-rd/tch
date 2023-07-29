'use client';

import { Badge, Button, Group, Stack } from '@mantine/core';
import { IconPointFilled } from '@tabler/icons-react';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';

import Container from '@/components/Atoms/container';
import CardListBase from '@/components/Molecules/card-list-base';
import CardListItem from '@/components/Molecules/card-list-item';
import CardListItemDescription from '@/components/Molecules/card-list-item-description';
import CardListItemTitle from '@/components/Molecules/card-list-item-title';
import ModalCreateRegistration from '@/components/Molecules/modal-create-registration';
import Paragraph from '@/components/Molecules/paragraph';
import SectionHeader from '@/components/Molecules/section-header';
import { paths } from '@/config/paths';
import { useCreateRegistration } from '@/lib/hooks/useCreateRegistration';
import { createRegistrationModalState } from '@/lib/recoil/createRegistrationAtom';
import { formatPrice } from '@/lib/utils';
import { route } from '@/lib/utils/path';
import type { Competition, Event } from '@/types/technofest';

interface Props {
  competitions: Event<Competition>[];
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function EventCompetitions(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { competitions } = props;

  const setCreateEventRegistration = useSetRecoilState(createRegistrationModalState);

  const { createRegistration, loading } = useCreateRegistration();

  const handleRegisterButtonClick = (competition: Event<Competition>) => {
    if (competition.eventable?.max_participants && competition.eventable?.max_participants > 1) {
      setCreateEventRegistration({
        opened: true,
        eventCodename: competition.codename,
      });
    } else {
      createRegistration(competition.codename);
    }
  };

  return (
    <Container small>
      <SectionHeader title="Kompetisi" secondary />
      <CardListBase>
        {competitions.map((competition) => (
          <CardListItem key={competition.id}>
            <Group position="apart" align="end">
              <Stack spacing={0}>
                <Group spacing="xs">
                  <CardListItemTitle>{competition.name}</CardListItemTitle>
                  {competition.event_registrations?.length === 1 && (
                    <Badge variant="light" size="sm">
                      Diikuti
                    </Badge>
                  )}
                </Group>
                <Group spacing={6}>
                  <CardListItemDescription>
                    {competition.eventable?.max_participants && competition.eventable?.max_participants > 1
                      ? `Tim - maks ${competition.eventable?.max_participants} peserta`
                      : 'Individual'}
                  </CardListItemDescription>
                  <IconPointFilled size="10" />
                  <CardListItemDescription>{formatPrice(competition.price || 0)}</CardListItemDescription>
                </Group>
              </Stack>
              <Group spacing={6}>
                <Button
                  px="md"
                  compact
                  radius="xl"
                  variant="light"
                  color="blue"
                  component={Link}
                  href={route(paths.eventDetail, { eventCodename: competition.codename as string })}
                >
                  Info
                </Button>
                {competition.event_registrations && competition.event_registrations?.length > 0 ? (
                  <Button
                    px="md"
                    variant="outline"
                    component={Link}
                    compact
                    radius="xl"
                    href={route(paths.userEventRegisration, { eventCodename: competition.codename })}
                  >
                    Detail
                  </Button>
                ) : (
                  <Button px="md" compact radius="xl" onClick={() => handleRegisterButtonClick(competition)} loading={loading}>
                    Ikuti
                  </Button>
                )}
              </Group>
            </Group>
          </CardListItem>
        ))}

        {competitions.length === 0 && (
          <Paragraph my="2rem" ta="center">
            Tidak ada kompetisi yang tersedia
          </Paragraph>
        )}
      </CardListBase>

      <ModalCreateRegistration />
    </Container>
  );
}
