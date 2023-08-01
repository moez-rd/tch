'use client';

import { Loader, Stack } from '@mantine/core';

import BaseContainer from '@/components/Atoms/base-container';
import Container from '@/components/Atoms/container';

export default function HomeLoading() {
  return (
    <BaseContainer>
      <Container>
        <Stack mih="100vh" align="center" justify="center">
          <Loader color="green" />
        </Stack>
      </Container>
    </BaseContainer>
  );
}
