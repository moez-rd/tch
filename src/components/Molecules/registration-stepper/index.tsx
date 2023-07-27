'use client';

import type { TextProps } from '@mantine/core';
import { Timeline } from '@mantine/core';
import React from 'react';

import Container from '@/components/Atoms/container';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props extends TextProps {
  children: React.ReactNode;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function RegistrationStepper(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { children } = props;

  return (
    <Container small>
      <Timeline bulletSize={24} lineWidth={2} active={10}>
        {children}
      </Timeline>
    </Container>
  );
}
