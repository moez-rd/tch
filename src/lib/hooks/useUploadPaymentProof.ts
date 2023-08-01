import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';
import { useState } from 'react';

import { getClientSanctumToken } from '@/lib/auth/clientToken';
import { userUpdatePaymentById } from '@/lib/fetch/v1';
import { uploadFile } from '@/lib/firebase/storage';

export const useUploadPaymentProof = (paymentId: string, registrationUid: string) => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm({
    initialValues: {
      proof: '',
    },

    validate: {
      proof: (value) => (value === '' ? 'Bukti pembayaran wajib diisi' : null),
    },
  });

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    form.validate();

    if (form.isValid()) {
      const file = form.values.proof as unknown as File;

      const fileName = `event-registration-proofs/${registrationUid}_${file.name}`;

      uploadFile(file, fileName).then((res) => {
        userUpdatePaymentById(getClientSanctumToken() as string, paymentId, { proof: res }).then(() => {
          setLoading(false);
          router.refresh();
        });
      });
    } else {
      setLoading(false);
      router.refresh();
    }
  };

  return {
    form,
    error,
    handleSubmit,
    loading,
  };
};
