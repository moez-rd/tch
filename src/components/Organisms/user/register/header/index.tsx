'use client';

import { Stack, Title } from '@mantine/core';

import Container from '@/components/Atoms/container';

interface Props {}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function RegisterHeader(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return (
    <Container small>
      <Stack align="center" mt="8rem">
        <Title order={1} color="gray.8">
          Pendaftaran
        </Title>
      </Stack>
    </Container>
  );
}
