import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useState } from 'react';

import { ErrorCode } from '@/enums/error-code';
import { getClientSanctumToken } from '@/lib/auth/clientToken';
import { userUpdatePassword } from '@/lib/fetch/v1';

export const useUserPassword = () => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      old_password: '',
      new_password: '',
      confirm_new_password: '',
    },

    validate: {
      old_password: (value) => (value === '' ? 'Kata sandi lama wajib diisi' : null),
      new_password: (value) => (value === '' ? 'Kata sandi baru wajib diisi' : value.length < 7 ? 'Minimal 7 karakter' : null),
      confirm_new_password: (value, values) => (value === '' ? 'Nama wajib diisi' : value !== values.new_password ? 'Kata sandi tidak cocok' : null),
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    form.validate();

    if (form.isValid()) {
      userUpdatePassword(getClientSanctumToken() as string, form.values.old_password, form.values.new_password).then((res) => {
        if (res.status === 401 && res.error_code === ErrorCode.NOT_AUTHENTICATED) {
          setError('Pengguna tidak terotentikasi');
          setLoading(false);
          form.reset();
          return;
        }

        if (res.status === 401 && res.error_code === ErrorCode.WRONG_PASSWORD) {
          setError('Password lama salah');
          setLoading(false);
          form.reset();
          return;
        }

        if (res.status === 422 && res.error_code === ErrorCode.VALIDATION_ERROR) {
          setError('Validasi server eror');
          setLoading(false);
          form.reset();
          return;
        }

        setSuccess('Kata sandi berhasil diperbarui');
        setLoading(false);
        form.reset();
        form.resetDirty();
        router.refresh();
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
