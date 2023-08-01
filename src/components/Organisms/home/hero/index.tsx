'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Group, Stack, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBolt } from '@tabler/icons-react';
import Link from 'next/link';

import Container from '@/components/Atoms/container';
import TextTransformers from '@/components/Atoms/text-transformers';
import SectionHeader from '@/components/Molecules/section-header';
import TimeCount from '@/components/Molecules/time-count';
import { paths } from '@/config/paths';
import { technofest } from '@/config/technofest';
import { route } from '@/lib/utils/path';

interface Props {}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function HomeHero(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  const theme = useMantineTheme();

  const maxSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const registrationTime = new Date() < technofest.registration_open_date ? technofest.registration_open_date : technofest.registration_close_date;
  const registrationTimeTitle = new Date() < technofest.registration_open_date ? 'Pembukaan pendaftaran' : 'Penutupan pendaftaran';

  return (
    <Container>
      <Stack maw="30rem" mx="auto" align="center" mt="10rem" ta="center">
        <TextTransformers />
        <Title order={1} size={maxSm ? '3rem' : '4rem'}>
          Technology Festival 2023.
        </Title>
        <Group spacing="xs">
          <Button
            component={Link}
            href={route(paths.login)}
            size="md"
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 105 }}
            leftIcon={<IconBolt />}
          >
            Gabung
          </Button>
          <Button component={Link} href={technofest.guidebookLink} target="_blank" size="md" color="green" variant="outline">
            Baca Guidebook
          </Button>
        </Group>

        <Stack spacing="2rem" mt="4rem" align="center">
          <SectionHeader title={registrationTimeTitle} position="center" />
          <TimeCount time={registrationTime} />
        </Stack>
      </Stack>
    </Container>
  );
}
