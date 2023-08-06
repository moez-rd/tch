import { cookies } from 'next/headers';
import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { ErrorCode } from '@/enums/error-code';
import { getServerSanctumToken } from '@/lib/auth/token';
import { attempt, login, userGetCurrent } from '@/lib/fetch/v1';
import type { ResponseData, User } from '@/types/technofest';

export const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        const res = await attempt(String(credentials?.email), String(credentials?.password), true);

        if (res.status !== 200) {
          return null;
        }

        return {
          id: String(res.data?.id),
          name: res.data?.name,
          email: res.data?.email,
          image: res.data?.avatar,
          access_token: res.data?.access_token,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // @ts-ignore
      const { access_token } = user;

      const res = await login(
        user.name || '',
        user.email || '',
        user.image || '',
        account?.provider || '',
        user.id,
        account?.provider === 'credentials' ? access_token : account?.access_token
      );

      if (res.status === 401 && res.error_code === ErrorCode.INVALID_ACCESS_TOKEN) {
        return false;
      }

      cookies().set('sanctum-token', res.data?.access_token as string, { secure: true, sameSite: 'lax' });

      return true;
    },
    async session({ session }) {
      const res: ResponseData<User> = await userGetCurrent(getServerSanctumToken() as string);

      // eslint-disable-next-line no-param-reassign
      session.user = res.data;

      return session;
    },
  },
  events: {
    async signOut() {
      cookies().set({
        name: 'sanctum-token',
        value: '',
        expires: new Date('2016-10-05'), // lol
        path: '/',
      });
    },
  },
  pages: {
    signIn: '/login',
  },
};
