'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Group, Stack, Title } from '@mantine/core';
import { IconBolt } from '@tabler/icons-react';
import Link from 'next/link';

import Container from '@/components/Atoms/container';
import TextTransformers from '@/components/Atoms/text-transformers';
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

  return (
    <Container>
      <Stack maw="30rem" mx="auto" align="center" mt="10rem" ta="center">
        <TextTransformers />
        <Title order={1} size="4rem">
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
          <Button component={Link} href={technofest.guidebookLink} size="md" color="green" variant="outline">
            Baca Guidebook
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
