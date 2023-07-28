'use client';

import { Button, Card, SimpleGrid, Stack, Title, useMantineTheme } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/Atoms/container';
import Paragraph from '@/components/Molecules/paragraph';
import SectionHeader from '@/components/Molecules/section-header';
import { paths } from '@/config/paths';
import { route } from '@/lib/utils/path';
import type { Competition, Event } from '@/types/technofest';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  competitions: Event<Competition>[];
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function HomeCompetitions(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { competitions } = props;

  const theme = useMantineTheme();

  return (
    <Container>
      <SectionHeader title="Kompetisi" subtitle="Kompetisi" position="center" />

      <Card radius="md" mt="2rem" p="md" withBorder>
        <SimpleGrid
          breakpoints={[
            { minWidth: 'xs', cols: 1 },
            { minWidth: 'sm', cols: 3 },
          ]}
        >
          {competitions.map((competition) => (
            <Stack
              key={competition.id}
              m={10}
              p="md"
              sx={{
                backgroundImage: theme.fn.gradient({ from: theme.colors.gray[1], to: theme.colors.gray[0], deg: 180 }),
                borderRadius: theme.radius.md,
              }}
            >
              <Image src={competition.image || ''} alt={competition.name} width={180} height={180} />
              <Title order={3} color={theme.colors.gray[1]}>
                {competition.name}
              </Title>
              <Paragraph color="dimmed" sx={{ flexGrow: 1 }}>
                {competition.description}
              </Paragraph>
              <Button component={Link} href={route(paths.eventDetail, { eventCodename: competition.codename })} variant="filled" mt="2rem" color="green">
                Info
              </Button>
            </Stack>
          ))}
        </SimpleGrid>
      </Card>
    </Container>
  );
}
