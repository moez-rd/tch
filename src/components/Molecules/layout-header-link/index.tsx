'use client';

import type { BoxProps } from '@mantine/core';
import { Box, Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import { useStyles } from '@/components/Organisms/layout/header/header.styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props extends BoxProps {
  label: string;
  link: string;
  colorWhite?: boolean;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function LayoutHeaderLink(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { label, link, colorWhite } = props;

  const { classes } = useStyles();

  return (
    <Box component={Link} href={link} className={classes.link}>
      <Text span color={colorWhite ? 'white' : ''}>
        {label}
      </Text>
    </Box>
  );
}
