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
export default function Paragraph(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { children } = props;

  return (
    <Text fw={300} size="lg" color="gray.7" {...props}>
      {children}
    </Text>
  );
}
