'use client';

import { Stack, Text, Title } from '@mantine/core';
import React from 'react';

import { useStyles } from './section-header.styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  title: string;
  subtitle?: string;
  position?: 'start' | 'center' | 'end';
  secondary?: boolean;
  dark?: boolean;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function SectionHeader(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { title, subtitle, position = 'start', secondary = false, dark = false } = props;

  const { classes, theme } = useStyles();

  if (secondary) {
    return (
      <Stack spacing={0} align={position}>
        <Title order={2} className={classes.subtitle} color={dark ? theme.colors.gray[0] : theme.colors.gray[7]}>
          {title}
        </Title>
      </Stack>
    );
  }

  return (
    <Stack spacing={0} align={position}>
      <Title order={2} className={classes.title} variant="gradient" gradient={{ from: 'green.5', to: 'green.9' }}>
        {title}
      </Title>
      <Text className={classes.subtitle} color={dark ? theme.colors.gray[0] : theme.colors.gray[7]}>
        {subtitle}
      </Text>
    </Stack>
  );
}
