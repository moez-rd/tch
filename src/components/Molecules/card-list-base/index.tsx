'use client';

import type { CardProps } from '@mantine/core';
import { Card, Stack, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
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

  const theme = useMantineTheme();

  const maxSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Card p={maxSm ? 'xs' : 'xl'} bg="gray.1" radius="md" {...props}>
      <Stack spacing="xs">{children}</Stack>
    </Card>
  );
}
