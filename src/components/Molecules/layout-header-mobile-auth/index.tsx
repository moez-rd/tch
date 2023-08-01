'use client';

import { Button, Stack } from '@mantine/core';
import Link from 'next/link';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import React from 'react';
import { useSetRecoilState } from 'recoil';

import { paths } from '@/config/paths';
import { mobileNavState } from '@/lib/recoil/mobileNavAtom';
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

  const setMobileNav = useSetRecoilState(mobileNavState);

  const closeMobileNav = () => {
    setMobileNav((prev) => {
      return {
        ...prev,
        opened: false,
      };
    });
  };

  const handleLogOutClick = () => {
    closeMobileNav();
    signOut();
  };

  if (session) {
    return (
      <Stack spacing="xs" mt="1.5rem">
        <Button component={Link} href={route(paths.userDashboard)} onClick={closeMobileNav} color="green">
          Dashboard
        </Button>
        <Button onClick={() => handleLogOutClick()} variant="outline" color="red">
          Logout
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing="xs" mt="1.5rem">
      <Button component={Link} href={route(paths.login)} variant="outline" onClick={closeMobileNav} color="green">
        Masuk
      </Button>
      <Button component={Link} href={route(paths.register)} onClick={closeMobileNav} color="green">
        Registrasi
      </Button>
    </Stack>
  );
}
