import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import type { Dispatch, MouseEvent, SetStateAction } from 'react';
import { useState } from 'react';

import { getClientSanctumToken } from '@/lib/auth/clientToken';
import { userUpdateRegistrationByUid } from '@/lib/fetch/v1';

export const useUpdateTeamName = (registrationUid: string, registrationName: string, setEditTeamName: Dispatch<SetStateAction<boolean>>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: registrationName,
    },

    validate: {
      name: (value) => (value === '' ? 'Nama tim wajib diisi' : null),
    },
  });

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    form.validate();

    if (form.isValid()) {
      userUpdateRegistrationByUid(getClientSanctumToken() as string, registrationUid, { name: form.values.name }).then(() => {
        setLoading(false);
        setEditTeamName(false);
        router.refresh();
      });

      return;
    }

    setLoading(false);
  };

  return {
    form,
    handleSubmit,
    loading,
  };
};
