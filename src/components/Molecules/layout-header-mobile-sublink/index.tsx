'use client';

import { Box, Collapse, Group, Stack, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

import { useStyles } from './layout-header-mobile-sublink.styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  label: string;
  links: {
    label: string;
    link: string;
  }[];
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function LayoutHeaderMobileSublink(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { label, links } = props;

  const [mobileSubNavOpened, { toggle: toggleMobileSubNav }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <>
      <UnstyledButton className={classes.link} w="100%" onClick={toggleMobileSubNav}>
        <Group position="apart" w="100%">
          <Box component="span" mr={5}>
            {label}
          </Box>
          <IconChevronRight
            size={16}
            stroke={2}
            style={{
              transform: mobileSubNavOpened ? `rotate(90deg)` : 'none',
              transition: 'transform 200ms ease',
            }}
          />
        </Group>
      </UnstyledButton>
      <Collapse in={mobileSubNavOpened}>
        <Stack spacing={0} pl="lg" sx={{ borderLeft: `1px solid ${theme.colors.green[5]}` }}>
          {links.map((link) => (
            <Box key={link.label} component={Link} href={{ pathname: link.link }} pl="1rem" className={classes.link}>
              {link.label}
            </Box>
          ))}
        </Stack>
      </Collapse>
    </>
  );
}
