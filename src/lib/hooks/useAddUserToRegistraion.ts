import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import type { Dispatch, MouseEvent, SetStateAction } from 'react';
import { useState } from 'react';

import { ErrorCode } from '@/enums/error-code';
import { getClientSanctumToken } from '@/lib/auth/clientToken';
import { userAttachOtherUserToRegistrationByUid } from '@/lib/fetch/v1';

export const useAddUserToRegistraion = (registrationUid: string, setAddUserFormOpened: Dispatch<SetStateAction<boolean>>) => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm({
    initialValues: {
      uid: '',
    },
    validate: {
      uid: (value) => (value === '' ? 'UID wajib diisi' : null),
    },
  });

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    form.validate();

    if (form.isValid()) {
      userAttachOtherUserToRegistrationByUid(getClientSanctumToken() as string, registrationUid, form.values.uid).then((res) => {
        if (res.status === 401 && res.error_code === ErrorCode.NOT_AUTHENTICATED) {
          setError('User tidak terotentikasi.');
          setLoading(false);
          return;
        }

        if (res.status === 404 && res.error_code === ErrorCode.NOT_FOUND) {
          setError('Peserta tidak ditemukan.');
          setLoading(false);
          return;
        }

        if (res.status === 409 && res.error_code === ErrorCode.ALREADY_ATTACHED) {
          setError('Peserta sudah terdaftar di pendaftaran ini/lain.');
          setLoading(false);
          return;
        }

        setSuccess('Berhasil menambahkan peserta.');
        setLoading(false);
        setAddUserFormOpened(false);
        router.refresh();
      });

      form.reset();
      return;
    }

    setLoading(false);
  };

  return {
    form,
    error,
    success,
    handleSubmit,
    loading,
  };
};
