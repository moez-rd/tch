import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';

import { paths } from '@/config/paths';
import { ErrorCode } from '@/enums/error-code';
import { getClientSanctumToken } from '@/lib/auth/clientToken';
import { userAttachToRegistrationByUid } from '@/lib/fetch/v1';
import { route } from '@/lib/utils/path';

export const useJoinRegistration = () => {
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

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>, eventCodename: string) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    form.validate();

    if (form.isValid()) {
      userAttachToRegistrationByUid(getClientSanctumToken() as string, form.values.uid).then((res) => {
        if (res.status === 401 && res.error_code === ErrorCode.NOT_AUTHENTICATED) {
          setError('User tidak terotentikasi');
          setLoading(false);
          return;
        }

        if (res.status === 404 && res.error_code === ErrorCode.NOT_FOUND) {
          setError('Event tidak ditemukan');
          setLoading(false);
          return;
        }

        if (res.status === 409 && res.error_code === ErrorCode.ALREADY_REGISTERED) {
          setError('Sudah terdaftar');
          setLoading(false);
          return;
        }

        router.push(route(paths.userEventRegisration, { eventCodename }));
        setLoading(false);
      });

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
