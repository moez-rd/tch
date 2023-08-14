'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box, Button, Title } from '@mantine/core';
import Link from 'next/link';

import BaseContainer from '@/components/Atoms/base-container';
import Container from '@/components/Atoms/container';
import CardListItem from '@/components/Molecules/card-list-item';
import Paragraph from '@/components/Molecules/paragraph';

interface Props {}

/**
 * React page
 *
 * @param props
 * @returns
 */
export default function MerchandisePage(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return (
    <BaseContainer>
      <Container small>
        <Box mt="10rem">
          <CardListItem>
            <Title order={1}>Merchandise</Title>
            <Paragraph>Pre-Order Merchandise Technofest 2023</Paragraph>
            <Paragraph>Pemesanan 14 Agustus - 6 September</Paragraph>
            <Button
              component={Link}
              href="https://forms.gle/TSz7EUkYLvKHnEJX9"
              target="_blank"
              variant="gradient"
              gradient={{ from: 'orange', to: 'red' }}
              size="lg"
              mt="1rem"
            >
              Pesan
            </Button>
          </CardListItem>
        </Box>
      </Container>
    </BaseContainer>
  );
}
