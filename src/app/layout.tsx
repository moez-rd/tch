import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react';

import LayoutFooter from '@/components/Organisms/layout/footer';
import LayoutHeader from '@/components/Organisms/layout/header';
import { appConfig } from '@/config/app';
import { options } from '@/lib/auth/nextauth';
import { competitionsGetAll, seminarsGetAll } from '@/lib/fetch/v1';

import Providers from './providers';

export const metadata: Metadata = {
  title: appConfig.title,
  description: appConfig.description,
};

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout(props: Props) {
  const { children } = props;

  const session = await getServerSession(options);

  const competitions = await competitionsGetAll();
  const seminars = await seminarsGetAll();

  return (
    <html lang={appConfig.lang}>
      <body>
        <Providers>
          <LayoutHeader session={session} competitions={competitions.data || []} seminars={seminars.data || []} />
          <main>{children}</main>
          <LayoutFooter />
        </Providers>
      </body>
    </html>
  );
}
