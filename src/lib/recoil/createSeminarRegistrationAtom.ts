import { atom } from 'recoil';

export type CreateSeminarRegistrationModal = {
  opened: boolean;
  eventCodename: string | null;
};

const defaultCreateSeminarRegistrationModal: CreateSeminarRegistrationModal = {
  opened: false,
  eventCodename: null,
};

export const createSeminarRegistrationModalState = atom<CreateSeminarRegistrationModal>({
  key: 'createSeminarRegistrationModalState',
  default: defaultCreateSeminarRegistrationModal,
});
