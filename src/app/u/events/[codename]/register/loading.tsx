'use client';

import { Group, Skeleton, Stack } from '@mantine/core';

import BaseContainer from '@/components/Atoms/base-container';
import Container from '@/components/Atoms/container';
import PageHeader from '@/components/Molecules/page-header';

export default function HomeLoading() {
  return (
    <BaseContainer spacing="small">
      <Container>
        <PageHeader>Pendaftaran</PageHeader>
      </Container>
      <Container small>
        <Stack>
          <Group position="apart">
            <Skeleton height="2rem" maw="8rem" radius="md" />
            <Skeleton height="2rem" maw="6rem" radius="md" />
          </Group>
          <Stack>
            <Skeleton height="2rem" maw="20rem" radius="md" />
            <Skeleton height="6rem" radius="md" />
          </Stack>
          <Stack>
            <Skeleton height="2rem" maw="20rem" radius="md" />
            <Skeleton height="6rem" radius="md" />
          </Stack>
          <Stack>
            <Skeleton height="2rem" maw="20rem" radius="md" />
            <Skeleton height="6rem" radius="md" />
          </Stack>
        </Stack>
      </Container>
    </BaseContainer>
  );
}
