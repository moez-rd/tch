'use client';

import { Avatar, Button, Group, Menu, Stack, Text, UnstyledButton } from '@mantine/core';
import { IconDashboard, IconLogout2 } from '@tabler/icons-react';
import Link from 'next/link';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import React from 'react';

import { useStyles } from '@/components/Organisms/layout/header/header.styles';
import { paths } from '@/config/paths';
import { getFirstLetters } from '@/lib/utils';
import { route } from '@/lib/utils/path';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  session: Session | null;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function LayoutHeaderAuth(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { session } = props;

  const { classes } = useStyles();

  if (session) {
    return (
      <Group className={classes.hiddenMobile}>
        <Button component={Link} href={route(paths.userDashboard)} variant="subtle">
          Dashboard
        </Button>
        <Menu shadow="md" width={200} withinPortal transitionProps={{ transition: 'scale-y' }}>
          <Menu.Target>
            <UnstyledButton>
              <Avatar src={session.user?.avatar} color="green" radius="xl" bg="gray.3">
                {getFirstLetters(session.user?.name || '')}
              </Avatar>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Stack spacing={0} px={10} py={6} sx={(theme) => ({ borderBottom: `1px solid ${theme.colors.gray[2]}` })}>
              <Text weight={600} size="md">
                {session.user?.name}
              </Text>
              <Text size="xs" color="gray.6">
                UID:&nbsp;
                <Text ff="monospace" span>
                  {session.user?.uid}
                </Text>
              </Text>
            </Stack>
            <Menu.Label>Menu user</Menu.Label>
            <Menu.Item component={Link} href={route(paths.userDashboard)} icon={<IconDashboard size={14} />}>
              Dashboard
            </Menu.Item>
            <Menu.Item onClick={() => signOut()} color="red" icon={<IconLogout2 size={14} />}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    );
  }

  return (
    <Group spacing="xs" className={classes.hiddenMobile}>
      <Button component={Link} href={route(paths.login)} variant="subtle" color="green">
        Masuk
      </Button>
      <Button component={Link} href={route(paths.register)} color="green">
        Registrasi
      </Button>
    </Group>
  );
}
