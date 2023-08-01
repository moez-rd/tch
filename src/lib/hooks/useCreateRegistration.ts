import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { paths } from '@/config/paths';
import { getClientSanctumToken } from '@/lib/auth/clientToken';
import { userCreateRegistrationByEventCodename } from '@/lib/fetch/v1';
import { createRegistrationModalState } from '@/lib/recoil/createRegistrationAtom';
import { route } from '@/lib/utils/path';

export const useCreateRegistration = (requiredTeamName: boolean = false) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const setRegistrationModal = useSetRecoilState(createRegistrationModalState);

  const form = useForm({
    initialValues: {
      name: '',
    },
    validate: {
      name: (value) => (value === '' ? 'Nama tim wajib diisi' : null),
    },
  });

  const createRegistration = (eventCodename: string) => {
    setLoading(true);

    if (requiredTeamName) {
      form.validate();

      if (form.isValid()) {
        userCreateRegistrationByEventCodename(getClientSanctumToken() as string, eventCodename, form.values.name).then(() => {
          setRegistrationModal((prev) => {
            return {
              ...prev,
              opened: false,
            };
          });
          router.push(route(paths.userEventRegisration, { eventCodename }));
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } else {
      userCreateRegistrationByEventCodename(getClientSanctumToken() as string, eventCodename).then((res) => {
        console.log(res);
        setRegistrationModal((prev) => {
          return {
            ...prev,
            opened: false,
          };
        });
        router.push(route(paths.userEventRegisration, { eventCodename }));
        setLoading(false);
      });
    }
  };

  return {
    createRegistration,
    loading,
    form,
  };
};
