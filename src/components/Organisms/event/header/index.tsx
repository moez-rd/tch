'use client';

import { Button, Group, Stack, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/Atoms/container';
import Paragraph from '@/components/Molecules/paragraph';
import SectionHeader from '@/components/Molecules/section-header';
import TimeCount from '@/components/Molecules/time-count';
import { paths } from '@/config/paths';
import { technofest } from '@/config/technofest';
import { route } from '@/lib/utils/path';
import type { Competition, Event, Seminar } from '@/types/technofest';

interface Props {
  event: Event<Seminar | Competition>;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function EventHeader(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { event } = props;

  return (
    <Container>
      <Stack align="center" mt="6rem">
        {event.image && <Image src={event.image || ''} alt={event.name} width={240} height={240} />}
        <Title order={1} size="4rem">
          {event.name}
        </Title>
        <Paragraph ta="center">{event.description}</Paragraph>
        <Group spacing="xs">
          <Button component={Link} href={route(paths.userEvents)}>
            Daftar
          </Button>
          <Button variant="outline" component={Link} href={technofest.guidebookLink} target="_blank">
            Guidebook
          </Button>
        </Group>
        <Stack spacing="2rem" mt="4rem">
          <SectionHeader title="Pembukaan pendaftaran" position="center" />
          <TimeCount time={technofest.registration_open_date} />
        </Stack>
      </Stack>
    </Container>
  );
}
