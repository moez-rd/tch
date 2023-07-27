'use client';

import type { TitleProps } from '@mantine/core';
import { Title } from '@mantine/core';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props extends TitleProps {
  children: React.ReactNode;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function CardListItemTitle(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { children } = props;

  return (
    <Title order={3} color="gray.7" {...props}>
      {children}
    </Title>
  );
}
