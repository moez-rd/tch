// @ts-ignore
import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { paths } from '@/config/paths';
import { getClientSanctumToken } from '@/lib/auth/clientToken';
import { userDetachFromRegistrationByUid } from '@/lib/fetch/v1';
import { route } from '@/lib/utils/path';

export const useLeaveRegistration = (registrationUid: string) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const leave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    modals.openConfirmModal({
      title: 'Konfirmasi Keluar',
      centered: true,
      children: <Text size="sm">Yakin ingin keluar dari pendaftaran?</Text>,
      labels: { confirm: 'Ya', cancel: 'Batal' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        userDetachFromRegistrationByUid(getClientSanctumToken() as string, registrationUid).then(() => {
          setLoading(false);
          router.refresh();
          router.replace(route(paths.userDashboard));
        });
      },
    });
  };

  return {
    leave,
    loading,
  };
};
