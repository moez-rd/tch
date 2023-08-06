'use client';

import { Skeleton, Stack } from '@mantine/core';

import BaseContainer from '@/components/Atoms/base-container';
import Container from '@/components/Atoms/container';
import PageHeader from '@/components/Molecules/page-header';

export default function HomeLoading() {
  return (
    <BaseContainer>
      <Container>
        <PageHeader>Faqs</PageHeader>
      </Container>
      <Container small>
        <Stack>
          {[...Array(10)].map((i) => (
            <Skeleton key={i} height="4rem" radius="md" />
          ))}
        </Stack>
      </Container>
    </BaseContainer>
  );
}
