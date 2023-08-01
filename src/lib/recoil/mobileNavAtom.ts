import { atom } from 'recoil';

export type MobileNav = {
  opened: boolean;
};

const defaultMobileNav: MobileNav = {
  opened: false,
};

export const mobileNavState = atom<MobileNav>({
  key: 'mobileNavState',
  default: defaultMobileNav,
});
