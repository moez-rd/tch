'use client';

import { Button, Stack } from '@mantine/core';
import Link from 'next/link';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import React from 'react';

import { paths } from '@/config/paths';
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
export default function LayoutHeaderMobileAuth(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { session } = props;

  if (session) {
    return (
      <Stack spacing="xs" mt="1.5rem">
        <Button component={Link} href={route(paths.userDashboard)} color="green">
          Dashboard
        </Button>
        <Button onClick={() => signOut()} variant="outline" color="red">
          Logout
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing="xs" mt="1.5rem">
      <Button component={Link} href={route(paths.login)} variant="outline" color="green">
        Masuk
      </Button>
      <Button component={Link} href={route(paths.register)} color="green">
        Registrasi
      </Button>
    </Stack>
  );
}
