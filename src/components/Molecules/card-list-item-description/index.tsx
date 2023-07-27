'use client';

import type { TextProps } from '@mantine/core';
import { Text } from '@mantine/core';
import React from 'react';

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
export default function CardListItemDescription(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { children } = props;

  return (
    <Text size="xs" color="gray.6" {...props}>
      {children}
    </Text>
  );
}
