// @ts-ignore
import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { paths } from '@/config/paths';
import { getClientSanctumToken } from '@/lib/auth/clientToken';
import { userDeleteRegistrationByUid } from '@/lib/fetch/v1';
import { route } from '@/lib/utils/path';

export const useDeleteRegistration = (registrationUid: string) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const deleteRegistration = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    modals.openConfirmModal({
      title: 'Konfirmasi Penghapusan',
      centered: true,
      children: <Text size="sm">Yakin ingin menghapus pendaftaran?</Text>,
      labels: { confirm: 'Ya', cancel: 'Batal' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        userDeleteRegistrationByUid(getClientSanctumToken() as string, registrationUid).then(() => {
          setLoading(false);
          router.refresh();
          router.replace(route(paths.userDashboard));
        });
      },
      onAbort: () => {
        router.refresh();
        setLoading(false);
      },
    });
  };

  return {
    deleteRegistration,
    loading,
  };
};
