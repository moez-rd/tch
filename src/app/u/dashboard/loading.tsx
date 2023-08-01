'use client';

import { Skeleton, Stack } from '@mantine/core';

import BaseContainer from '@/components/Atoms/base-container';
import Container from '@/components/Atoms/container';

export default function HomeLoading() {
  return (
    <BaseContainer spacing="small">
      <Container>
        <Stack align="center" spacing="xs">
          <Skeleton h="16rem" mt="2rem" radius="md" />
          <Skeleton h="1rem" maw="26rem" radius="md" />
          <Skeleton h="0.7rem" maw="26rem" radius="md" />
          <Skeleton h="1rem" maw="20rem" radius="md" />
          <Skeleton h="2rem" maw="30rem" radius="md" />
        </Stack>
      </Container>
      <Container small>
        <Skeleton mih="8rem" radius="md" />
      </Container>
      <Container small>
        <Skeleton mih="8rem" radius="md" />
      </Container>
    </BaseContainer>
  );
}
