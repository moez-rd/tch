import { getCookie } from 'cookies-next';

export function getClientSanctumToken() {
  return getCookie('sanctum-token') as string | undefined;
}
