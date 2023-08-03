'use client';

import { Avatar, Box, Button, CopyButton, Flex, Group, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconAt, IconCheck, IconCopy, IconTicket, IconUserEdit } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

import Container from '@/components/Atoms/container';
import { paths } from '@/config/paths';
import { getFirstLetters } from '@/lib/utils';
import { route } from '@/lib/utils/path';
import type { User } from '@/types/technofest';

interface Props {
  user: User;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function DashboardHeader(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { user } = props;

  const theme = useMantineTheme();

  const maxSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Container>
      <Flex
        align="center"
        justify="center"
        bg="dark.5"
        h={maxSm ? '10rem' : '16rem'}
        mt="2rem"
        sx={{
          borderRadius: theme.radius.lg,
          backgroundColor: '#2c2e33',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%2351cf66' fill-opacity='0.4' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
        }}
      >
        <Text color="gray.3" sx={{ letterSpacing: '1rem', mr: '-1rem' }}>
          Welcome
        </Text>
      </Flex>
      <Stack spacing="sm" align="center" sx={{ transform: 'translateY(-2.4rem)' }}>
        <Box p={4} bg="white" sx={{ borderRadius: '100%' }}>
          <Avatar color="green" variant="filled" radius="100%" size="xl" src={user?.avatar} bg="gray.3">
            {getFirstLetters(user?.name || '')}
          </Avatar>
        </Box>
        <Stack spacing={0} align="center">
          <Title size="x-large">{user?.name}</Title>
          <Text size="sm" color="gray.6">
            {user?.email}
          </Text>
        </Stack>
        <Group bg="gray.3" pl="10px" sx={{ borderRadius: '4px' }}>
          <Text color="gray.9">UID:</Text>
          <Text color="gray.9" ff="monospace">
            <IconAt size="0.8em" />
            {user?.uid}
          </Text>
          <CopyButton value={user?.uid || ''}>
            {({ copied, copy }) => (
              <Button size="xs" color={copied ? 'teal' : 'blue'} onClick={copy}>
                {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
              </Button>
            )}
          </CopyButton>
        </Group>
        <Group spacing="xs" mt="3rem">
          <Button component={Link} href={route(paths.userProfile)} variant="outline" leftIcon={<IconUserEdit />}>
            {user.user_profile ? 'Ubah profil' : 'Lengkapi data'}
          </Button>
          <Button component={Link} href={route(paths.userEvents)} disabled={!user.user_profile} leftIcon={<IconTicket />}>
            Daftar event
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
