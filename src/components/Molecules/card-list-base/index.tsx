'use client';

import type { CardProps } from '@mantine/core';
import { Card, Stack } from '@mantine/core';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props extends CardProps {
  children: React.ReactNode;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function CardListBase(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { children } = props;

  return (
    <Card p="xl" bg="gray.1" radius="md" {...props}>
      <Stack spacing="xs">{children}</Stack>
    </Card>
  );
}
