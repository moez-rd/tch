import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { paths } from '@/config/paths';
import type { ParticipationMethod } from '@/enums/constants';
import { getClientSanctumToken } from '@/lib/auth/clientToken';
import { userCreateRegistrationByEventCodename } from '@/lib/fetch/v1';
import { createSeminarRegistrationModalState } from '@/lib/recoil/createSeminarRegistrationAtom';
import { route } from '@/lib/utils/path';

export const useCreateSeminarRegistration = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentCodename, setCurrentCodename] = useState<string>('');

  const router = useRouter();

  const setSeminarRegistrationModal = useSetRecoilState(createSeminarRegistrationModalState);

  const isLoading = (codename: string) => {
    if (codename !== currentCodename) {
      return false;
    }

    return loading;
  };

  const createRegistration = (eventCodename: string, participationMethod: ParticipationMethod) => {
    setLoading(true);
    setCurrentCodename(eventCodename);

    userCreateRegistrationByEventCodename(getClientSanctumToken() as string, eventCodename, { participationMethod: String(participationMethod) }).then(
      (res) => {
        console.log(res);
        setSeminarRegistrationModal((prev) => {
          return {
            ...prev,
            opened: false,
          };
        });
        router.push(route(paths.userEventRegisration, { eventCodename }));
        setLoading(false);
      }
    );
  };

  return {
    createRegistration,
    isLoading,
  };
};
