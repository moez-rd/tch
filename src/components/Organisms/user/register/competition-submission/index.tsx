'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert, Button, Group, Stack, Text } from '@mantine/core';
import { IconFile } from '@tabler/icons-react';
import Link from 'next/link';

import CardListItem from '@/components/Molecules/card-list-item';

interface Props {
  submission: string;
  paymentAccepted: boolean;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function RegisterCompetitionSubmission(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { submission, paymentAccepted } = props;

  return (
    <CardListItem>
      {!paymentAccepted ? (
        <Stack spacing="xs">
          <Alert title="Perhatian!" color="orange" mb="sm">
            Silakan unggah bukti pembayaran dan tunggu konfirmasi dari panitia sebelum mengumpulkan submission.
          </Alert>
        </Stack>
      ) : (
        <Stack spacing="xs">
          <Text>Kumpulkan hasil karya kompetisi melalui link berikut.</Text>
          <Group>
            <Button
              component={Link}
              href={submission || '#'}
              target="_blank"
              leftIcon={<IconFile size={16} />}
              px="md"
              compact
              radius="xl"
              variant="outline"
              color="green"
            >
              Kumpul
            </Button>
          </Group>
        </Stack>
      )}
    </CardListItem>
  );
}
