import { atom } from 'recoil';

export type CreateRegistrationModal = {
  opened: boolean;
  eventCodename: string | null;
};

const defaultCreateRegistrationModal: CreateRegistrationModal = {
  opened: false,
  eventCodename: null,
};

export const createRegistrationModalState = atom<CreateRegistrationModal>({
  key: 'createRegistrationModalState',
  default: defaultCreateRegistrationModal,
});
