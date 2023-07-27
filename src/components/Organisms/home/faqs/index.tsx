'use client';

import { Button, Card, Stack } from '@mantine/core';
import Link from 'next/link';

import Container from '@/components/Atoms/container';
import Paragraph from '@/components/Molecules/paragraph';
import SectionHeader from '@/components/Molecules/section-header';
import { paths } from '@/config/paths';
import { route } from '@/lib/utils/path';

interface Props {}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function HomeFaqs(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return (
    <Container>
      <Card bg="gray.1" py="3rem">
        <SectionHeader title="Faqs" subtitle="Ada Pertanyaan?" position="center" />
        <Stack align="center">
          <Paragraph ta="center">Punya pertanyaan seputar event perlombaan atau seminar. Silakan masuk ke halaman Faqs yaa.</Paragraph>
          <Button component={Link} href={route(paths.faqs)} px="4rem">
            Faqs
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}
