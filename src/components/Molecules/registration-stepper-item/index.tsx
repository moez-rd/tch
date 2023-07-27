'use client';

import type { TimelineItemProps } from '@mantine/core';
import { Timeline } from '@mantine/core';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props extends TimelineItemProps {
  children: React.ReactNode;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function RegistrationStepperItem(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { children } = props;

  return <Timeline.Item {...props}>{children}</Timeline.Item>;
}
