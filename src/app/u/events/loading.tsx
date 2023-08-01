'use client';

import { Skeleton, Stack } from '@mantine/core';

import BaseContainer from '@/components/Atoms/base-container';
import Container from '@/components/Atoms/container';
import PageHeader from '@/components/Molecules/page-header';

export default function HomeLoading() {
  return (
    <BaseContainer spacing="small">
      <Container>
        <PageHeader>Daftar Events</PageHeader>
      </Container>
      <Container small>
        <Stack>
          <Skeleton height="2rem" maw="8rem" radius="md" />
          <Skeleton mih="8rem" radius="md" />
        </Stack>
      </Container>
      <Container small>
        <Stack>
          <Skeleton height="2rem" maw="8rem" radius="md" />
          <Skeleton mih="8rem" radius="md" />
        </Stack>
      </Container>
    </BaseContainer>
  );
}
