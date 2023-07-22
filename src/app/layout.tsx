import type { Metadata } from 'next';
import React from 'react';

import { appConfig } from '@/config/app';

import Providers from './providers';

export const metadata: Metadata = {
  title: appConfig.title,
  description: appConfig.description,
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout(props: Props) {
  const { children } = props;

  return (
    <html lang={appConfig.lang}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
