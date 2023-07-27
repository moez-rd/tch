import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { technofest } from '@/config/technofest';
import { getServerSanctumToken } from '@/lib/auth/token';
import { userGetCurrent } from '@/lib/fetch/v1';

import { options } from './nextauth';

export async function redirectIfAuthenticated() {
  const session = await getServerSession(options);
  if (session) redirect(technofest.authenticatedHomePath);
}

export async function redirectIfNotAuthenticated() {
  const session = await getServerSession(options);
  if (!session) redirect(technofest.guestHomePath);
}

export async function redirectIfUserNotHasProfile() {
  await redirectIfNotAuthenticated();

  const user = await userGetCurrent(getServerSanctumToken() as string, ['userProfile']);

  if (!user.data?.user_profile) {
    redirect(technofest.authenticatedHomePath);
  }
}
