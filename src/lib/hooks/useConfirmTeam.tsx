// @ts-ignore
import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { getClientSanctumToken } from '@/lib/auth/clientToken';
import { userUpdateRegistrationByUid } from '@/lib/fetch/v1';

export const useConfirmTeam = (registrationUid: string) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const confirmTeam = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    modals.openConfirmModal({
      title: 'Konfirmasi Tim',
      centered: true,
      children: <Text size="sm">Ingin mengkonfirmasi tim? Tindakan ini akan membuat nama tim dan peserta tidak dapat diubah lagi.</Text>,
      labels: { confirm: 'Ya', cancel: 'Batal' },
      confirmProps: { color: 'green' },
      onConfirm: () => {
        userUpdateRegistrationByUid(getClientSanctumToken() as string, registrationUid, { confirmed: 1 }).then(() => {
          setLoading(false);
          router.refresh();
        });
      },
      onAbort: () => {
        setLoading(false);
      },
    });
  };

  return {
    confirmTeam,
    loading,
  };
};
