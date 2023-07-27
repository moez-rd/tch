// @ts-ignore
import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { getClientSanctumToken } from '@/lib/auth/clientToken';
import { userDetachOtherUserFromRegistrationByUid } from '@/lib/fetch/v1';
import type { User } from '@/types/technofest';

export const useRemoveUserFromRegistration = (registrationUid: string) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const removeUser = (event: React.MouseEvent<HTMLButtonElement>, user: User) => {
    event.preventDefault();
    setLoading(true);

    modals.openConfirmModal({
      title: 'Konfirmasi Penghapusan',
      centered: true,
      children: (
        <Text size="sm">
          Yakin ingin menghapus&nbsp;
          <Text span weight={500}>
            {user.name}
          </Text>
          ?
        </Text>
      ),
      labels: { confirm: 'Ya', cancel: 'Batal' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        userDetachOtherUserFromRegistrationByUid(getClientSanctumToken() as string, registrationUid, user.uid).then(() => {
          setLoading(false);
          router.refresh();
        });
      },
    });
  };

  return {
    removeUser,
    loading,
  };
};
