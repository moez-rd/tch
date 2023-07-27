import { useForm } from '@mantine/form';
// @ts-ignore
import type { BuiltInProviderType } from 'next-auth/providers';
import type { LiteralUnion } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { regexs } from '@/config/regexs';
import { ErrorCode } from '@/enums/error-code';
import { attempt } from '@/lib/fetch/v1';

export const useLogin = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (value === '' ? 'Email wajib diisi' : !regexs.email.test(value) ? 'Email tidak valid' : null),
      password: (value) => (value === '' ? 'Kata sandi wajib diisi' : null),
    },
  });

  const handleLogin = (provider: LiteralUnion<BuiltInProviderType> | undefined, event?: React.FormEvent<HTMLFormElement>) => {
    setError('');
    setLoading(true);

    if (provider === 'credentials') {
      event?.preventDefault();
      form.validate();

      if (form.isValid()) {
        attempt(form.values.email, form.values.password).then((res) => {
          if (res.status === 401 && res.error_code === ErrorCode.INVALID_CREDENTIALS) {
            setError('Email atau password salah.');
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
            callbackUrl: 'http://127.0.0.1:3000/u/dashboard',
          }).then(() => {
            setLoading(false);
          });
        });

        return;
      }
      setLoading(false);
      return;
    }

    signIn(provider).then(() => {
      setLoading(false);
    });
  };

  return {
    form,
    error,
    handleLogin,
    loading,
  };
};
