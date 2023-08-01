'use client';

import { MantineProvider, useEmotionCache } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { useServerInsertedHTML } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { RecoilRoot } from 'recoil';

import { theme } from '@/lib/mantine/theme';

interface Props {
  children: React.ReactNode;
}

export default function Providers(props: Props) {
  const { children } = props;

  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return (
    <SessionProvider>
      <RecoilRoot>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <ModalsProvider>{children}</ModalsProvider>
        </MantineProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
