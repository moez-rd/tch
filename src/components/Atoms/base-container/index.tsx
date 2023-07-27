'use client';

import { Stack } from '@mantine/core';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  children: React.ReactNode;
  spacing?: 'small' | 'large';
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function BaseContainer(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { children, spacing = 'large' } = props;

  return (
    <Stack spacing={spacing === 'large' ? '10rem' : '4rem'} pb="10rem">
      {children}
    </Stack>
  );
}
