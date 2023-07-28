import { useForm } from '@mantine/form';
// @ts-ignore
import type { BuiltInProviderType } from 'next-auth/providers';
import type { LiteralUnion } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { regexs } from '@/config/regexs';
import { ErrorCode } from '@/enums/error-code';
import { register } from '@/lib/fetch/v1';

export const useRegister = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },

    validate: {
      name: (value) => (value === '' ? 'Nama wajib diisi' : null),
      email: (value) => (value === '' ? 'Email wajib diisi' : !regexs.email.test(value) ? 'Email tidak valid' : null),
      password: (value) => (value === '' ? 'Password wajib diisi' : value.length < 7 ? 'Minimal 7 karakter' : null),
      confirm_password: (value, values) => (value === '' ? 'Kata sandi wajib diisi' : value !== values.password ? 'Kata sandi tidak cocok' : null),
    },
  });

  const handleRegister = (provider: LiteralUnion<BuiltInProviderType> | undefined, event?: React.FormEvent<HTMLFormElement>) => {
    setError('');
    setLoading(true);

    if (provider === 'credentials') {
      event?.preventDefault();
      form.validate();

      if (form.isValid()) {
        register(form.values.name, form.values.email, form.values.password).then((res) => {
          console.log(res);
          if (res.status === 409 && res.error_code === ErrorCode.EMAIL_ALREADY_EXISTS) {
            setError('Email telah diambil.');
            setLoading(false);
            return;
          }

          if (res.status === 422 && res.error_code === ErrorCode.VALIDATION_ERROR) {
            setError('Validasi server eror.');
            setLoading(false);
            return;
          }

          signIn(provider, {
            email: form.values.email,
            password: form.values.password,
          }).then(() => {
            setLoading(false);
          });
        });

        return;
      }
      setLoading(false);
    } else {
      signIn(provider).then(() => {
        setLoading(false);
      });
    }
  };

  return {
    form,
    error,
    handleRegister,
    loading,
  };
};
