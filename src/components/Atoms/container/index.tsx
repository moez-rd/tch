'use client';

import { Container as MantineContainer } from '@mantine/core';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  children: React.ReactNode;
  small?: boolean;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function Container(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { children, small = false } = props;

  return (
    <section>
      <MantineContainer size={small ? 'sm' : 'lg'}>{children}</MantineContainer>
    </section>
  );
}
