'use client';

import { Skeleton, Stack } from '@mantine/core';

import BaseContainer from '@/components/Atoms/base-container';
import Container from '@/components/Atoms/container';
import PageHeader from '@/components/Molecules/page-header';

export default function HomeLoading() {
  return (
    <BaseContainer>
      <Container small>
        <PageHeader>Profil</PageHeader>
      </Container>
      <Container small>
        <Stack>
          {[...Array(10)].map((i) => (
            <Skeleton height="4rem" key={i} radius="md" />
          ))}
        </Stack>
      </Container>
    </BaseContainer>
  );
}
