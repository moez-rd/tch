'use client';

import { Avatar, Box, Button, CopyButton, Flex, Group, Stack, Text, Title } from '@mantine/core';
import { IconCheck, IconCopy, IconTicket, IconUserEdit } from '@tabler/icons-react';
import Link from 'next/link';

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

  return (
    <Container>
      <Flex align="center" justify="center" bg="dark.5" h="16rem" mt="2rem" sx={(theme) => ({ borderRadius: theme.radius.lg })}>
        <Text color="gray.6" sx={{ letterSpacing: '1rem', mr: '-1rem' }}>
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
