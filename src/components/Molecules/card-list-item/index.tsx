'use client';

import type { CardProps } from '@mantine/core';
import { Card } from '@mantine/core';
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
export default function CardListItem(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { children } = props;

  return (
    <Card shadow="xs" color="gray.0">
      {children}
    </Card>
  );
}
