'use client';

import { Card, SimpleGrid, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import Image from 'next/image';

import Container from '@/components/Atoms/container';
import Paragraph from '@/components/Molecules/paragraph';
import { seminarCastRoleToLabel } from '@/lib/utils/converter';
import type { SeminarCast } from '@/types/technofest';

interface Props {
  seminarCasts: SeminarCast[];
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function EventSeminarCasts(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { seminarCasts } = props;

  const theme = useMantineTheme();

  return (
    <Container>
      <Card radius="md" mt="2rem" p="md" withBorder>
        <SimpleGrid
          breakpoints={[
            { minWidth: 'xs', cols: 1 },
            { minWidth: 'sm', cols: 4 },
          ]}
        >
          {seminarCasts.map((seminarCast) => (
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
      </Card>
    </Container>
  );
}
