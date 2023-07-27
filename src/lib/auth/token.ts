import { cookies } from 'next/headers';

export function getServerSanctumToken(): string | undefined {
  return cookies().get('sanctum-token')?.value;
}
