'use client';

import { Box } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { useSetRecoilState } from 'recoil';

import { mobileNavState } from '@/lib/recoil/mobileNavAtom';

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

  const setMobileNav = useSetRecoilState(mobileNavState);

  const closeMobileNav = () => {
    setMobileNav((prev) => {
      return {
        ...prev,
        opened: false,
      };
    });
  };

  const { classes } = useStyles();

  return (
    <Box component={Link} href={link} onClick={closeMobileNav} className={classes.link}>
      {label}
    </Box>
  );
}
