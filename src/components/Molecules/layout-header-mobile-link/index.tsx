'use client';

import { Box } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import { useStyles } from './layout-header-mobile-link.styles';

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
export default function LayoutHeaderMobileLink(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { label, link } = props;

  const { classes } = useStyles();

  return (
    <Box component={Link} href={{ pathname: link }} className={classes.link}>
      {label}
    </Box>
  );
}
