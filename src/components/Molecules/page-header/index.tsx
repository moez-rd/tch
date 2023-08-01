'use client';

import { Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  children: React.ReactNode;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function PageHeader(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { children } = props;

  const theme = useMantineTheme();

  const maxSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Text fw={300} size="lg" color="gray.7" {...props}>
      <Stack align="center" mt="8rem">
        <Title order={1} size={maxSm ? '2.6rem' : '3rem'} color="gray.8">
          {children}
        </Title>
      </Stack>
    </Text>
  );
}
