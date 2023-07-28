'use client';

import { Button, Card, Group, SimpleGrid, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/Atoms/container';
import Paragraph from '@/components/Molecules/paragraph';
import SectionHeader from '@/components/Molecules/section-header';
import { paths } from '@/config/paths';
import { seminarCastRoleToLabel } from '@/lib/utils/converter';
import { route } from '@/lib/utils/path';
import type { Event, Seminar } from '@/types/technofest';

interface Props {
  seminar: Event<Seminar>;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function HomeSeminar(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { seminar } = props;

  const theme = useMantineTheme();

  return (
    <Container>
      <SectionHeader title="Seminar" subtitle="Seminar" position="center" />

      <Card radius="md" mt="2rem" p="md" withBorder>
        <SimpleGrid
          breakpoints={[
            { minWidth: 'xs', cols: 1 },
            { minWidth: 'sm', cols: 4 },
          ]}
        >
          {seminar.eventable?.seminar_casts.map((seminarCast) => (
            <Stack
              key={seminarCast.id}
              m={10}
              p="md"
              sx={{
                backgroundImage: theme.fn.gradient({ from: theme.colors.gray[1], to: 'transparent', deg: 180 }),
                borderRadius: theme.radius.md,
              }}
            >
              <Image src={seminarCast.image || ''} alt={seminarCast.name} width={180} height={180} />
              <Stack spacing={0}>
                <Title order={3}>{seminarCast.name}</Title>
                <Text ff="monospace" size="sm" color="green.7">
                  {seminarCast.title}
                </Text>
                <Paragraph mt="6px" sx={{ flexGrow: 1 }}>
                  {seminarCastRoleToLabel(seminarCast.role)}
                </Paragraph>
              </Stack>
            </Stack>
          ))}
        </SimpleGrid>
        <Group position="center">
          <Button component={Link} href={route(paths.eventDetail, { eventCodename: seminar.codename })} px="6rem" variant="outline" mt="2rem" color="green">
            Info
          </Button>
        </Group>
      </Card>
    </Container>
  );
}
