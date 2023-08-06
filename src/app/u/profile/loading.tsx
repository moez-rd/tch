'use client';

import { Skeleton, Stack } from '@mantine/core';

import BaseContainer from '@/components/Atoms/base-container';
import Container from '@/components/Atoms/container';
import PageHeader from '@/components/Molecules/page-header';

export default function HomeLoading() {
  return (
    <BaseContainer spacing="small">
      <Container small>
        <PageHeader>Profil</PageHeader>
      </Container>
      <Container small>
        <Stack>
          <Skeleton height="2rem" maw="8rem" radius="md" />
          <Stack>
            {[...Array(10)].map((i) => (
              <Stack key={i}>
                <Skeleton height="1rem" maw="20rem" radius="md" />
                <Skeleton height="2rem" radius="md" />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </BaseContainer>
  );
}
