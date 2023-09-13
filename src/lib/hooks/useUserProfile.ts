import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useState } from 'react';

import { regexs } from '@/config/regexs';
import { ErrorCode } from '@/enums/error-code';
import { getClientSanctumToken } from '@/lib/auth/clientToken';
import { userUpdateProfile } from '@/lib/fetch/v1';
import type { RecursivePartial } from '@/types/app';
import type { User } from '@/types/technofest';

export const useUserProfile = (user: User) => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: user.name,
      email: user.email,
      user_profile: {
        institution: user.user_profile?.institution || '',
        // education_level: String(user.user_profile?.education_level) || '',
        // id_number: user.user_profile?.id_number || '',
        // id_card_image: user.user_profile?.id_card_image || '',
        gender: String(user.user_profile?.gender) || '',
        whatsapp: user.user_profile?.whatsapp || '',
      },
    },

    validate: {
      name: (value) => (value === '' ? 'Nama wajib diisi' : null),
      email: (value) => (value === '' ? 'Email wajib diisi' : !regexs.email.test(value) ? 'Email tidak valid' : null),
      user_profile: {
        institution: (value) => (value === '' ? 'Institusi wajib diisi' : null),
        // education_level: (value) => (value === 'undefined' ? 'Status wajib diisi' : null),
        // id_number: (value) => (value === '' ? 'NIS/NISM wajib diisi' : null),
        // id_card_image: (value) => (value === '' ? 'Kartu tanda siswa/mahasiswa wajib diisi' : null),
        gender: (value) => (value === 'undefined' ? 'Jenis kelamin wajib diisi' : null),
        whatsapp: (value) => (value === '' ? 'Nomor WhatsApp wajib diisi' : !regexs.phone.test(value) ? 'Nomor tidak valid' : null),
      },
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    form.validate();
    if (form.isValid()) {
      // const file = form.values.user_profile.id_card_image as unknown as File;

      // const fileName = `id-card-images/${user.uid}_${file.name}`;

      // uploadFile(file, fileName).then((name) => {
      const updatedUser: RecursivePartial<User> = {
        name: form.values.name,
        email: form.values.email,
        user_profile: {
          institution: form.values.user_profile.institution,
          // education_level: Number(form.values.user_profile.education_level),
          // id_number: form.values.user_profile.id_number,
          // id_card_image: name,
          gender: form.values.user_profile.gender,
          whatsapp: form.values.user_profile.whatsapp,
        },
      };

      userUpdateProfile(getClientSanctumToken() as string, updatedUser).then((res) => {
        if (res.status === 401 && res.error_code === ErrorCode.NOT_AUTHENTICATED) {
          setError('User tidak terotentikasi');
          setLoading(false);
          return;
        }

        if (res.status === 422 && res.error_code === ErrorCode.VALIDATION_ERROR) {
          setError('Validasi server eror');
          setLoading(false);
          return;
        }

        setSuccess('Data berhasil disimpan');
        setLoading(false);
        form.resetDirty();
        router.refresh();
      });
      // });

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
