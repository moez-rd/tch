'use client';

import { Box, Center, Divider, Group, HoverCard, SimpleGrid, Text, UnstyledButton } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

import { useStyles } from './layout-header-dropdown.styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  label: string;
  links: {
    label: string;
    sublabel: string;
    link: string;
  }[];
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function LayoutHeaderDropdowm(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { label, links } = props;

  const { classes } = useStyles();

  return (
    <HoverCard width={400} position="bottom-start" openDelay={80} radius="md" shadow="md" withinPortal transitionProps={{ transition: 'scale-y' }}>
      <HoverCard.Target>
        <Box className={classes.link}>
          <Center inline>
            <Box component="span" mr={5}>
              {label}
            </Box>
            <IconChevronDown size={16} />
          </Center>
        </Box>
      </HoverCard.Target>

      <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
        <Box px="md">
          <Text fw={500}>{label}</Text>
        </Box>

        <Divider my="sm" mx="-md" color="gray.1" />

        <SimpleGrid cols={1} spacing={0}>
          {links.map((link) => (
            <UnstyledButton key={link.label} component={Link} href={link.link} className={classes.subLink}>
              <Group noWrap align="flex-start">
                <div>
                  <Text size="lg" fw={500} className={classes.subLinkLabel}>
                    {link.label}
                  </Text>
                  <Text size="xs" className={classes.subLinkSubLabel}>
                    {link.sublabel}
                  </Text>
                </div>
              </Group>
            </UnstyledButton>
          ))}
        </SimpleGrid>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
