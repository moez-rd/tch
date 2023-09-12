'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert, Button, Group, Stack, Text } from '@mantine/core';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import Link from 'next/link';

import CardListItem from '@/components/Molecules/card-list-item';
import type { Event, Seminar } from '@/types/technofest';

interface Props {
  whatsapp: string;
  paymentAccepted: boolean;
  seminar: Event<Seminar> | undefined;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function RegisterWhatsappGroup(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { whatsapp, paymentAccepted, seminar } = props;

  return (
    <CardListItem>
      {!paymentAccepted && !seminar ? (
        <Stack spacing="xs">
          <Alert title="Perhatian!" color="orange" mb="sm">
            Silakan unggah bukti pembayaran dan tunggu konfirmasi dari panitia sebelum memasuki grup WhatsApp.
          </Alert>
        </Stack>
      ) : (
        <Stack spacing="xs">
          <Text>Masuk ke grup WhatsApp untuk informasi event dari panitia.</Text>
          <Group>
            <Button
              component={Link}
              href={whatsapp || '#'}
              target="_blank"
              leftIcon={<IconBrandWhatsapp size={16} />}
              px="md"
              compact
              radius="xl"
              variant="outline"
              color="green"
            >
              Gabung
            </Button>
          </Group>
        </Stack>
      )}
    </CardListItem>
  );
}
