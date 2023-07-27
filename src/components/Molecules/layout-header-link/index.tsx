'use client';

import { Box } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import { useStyles } from '@/components/Organisms/layout/header/header.styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  label: string;
  link: string;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function LayoutHeaderLink(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { label, link } = props;

  const { classes } = useStyles();

  return (
    <Box component={Link} href={link} className={classes.link}>
      {label}
    </Box>
  );
}
