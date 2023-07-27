'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Alert, Badge, Box, Button, FileInput, Group, rem, Stack, Text } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';

import CardListItem from '@/components/Molecules/card-list-item';
import { technofest } from '@/config/technofest';
import { PaymentStatus } from '@/enums/constants';
import { useUploadPaymentProof } from '@/lib/hooks/useUploadPaymentProof';
import { formatPrice } from '@/lib/utils';
import { paymentBankToColor } from '@/lib/utils/converter';
import type { EventRegistrationPayment } from '@/types/technofest';

interface Props {
  payment: EventRegistrationPayment;
  registrationUid: string;
  confirmed: number;
  price: number;
  max_participants: number;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function RegisterPayment(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { payment, price, registrationUid, confirmed, max_participants } = props;

  const { form, loading, handleSubmit } = useUploadPaymentProof(payment.id, registrationUid);

  return (
    <CardListItem>
      {payment.proof && payment.status === PaymentStatus.NOT_CONFIRMED ? (
        <Stack>
          <Alert title="Info!" color="blue" mb="sm">
            Terima kasih telah melakukan pembayaran. Silakan menunggu panitia mengkonfirmasi pembayaran Anda.
          </Alert>
          <Text color="gray.7">
            Status pembayaran: <Badge color="blue">Menunggu konfirmasi</Badge>
          </Text>
        </Stack>
      ) : payment.proof && payment.status === PaymentStatus.ACCEPTED ? (
        <Stack>
          <Text color="gray.7">
            Status pembayaran: <Badge color="green">Diterima</Badge>
          </Text>
        </Stack>
      ) : (
        <Stack spacing="xs">
          {!confirmed && max_participants > 1 && (
            <Alert title="Perhatian!" color="orange" mb="sm">
              Silakan konfirmasi tim sebelum melakukan pembayaran.
            </Alert>
          )}
          <Text>
            Silakan melakukan pembayaran sebesar{' '}
            <Text span weight={600}>
              {formatPrice(price)}
            </Text>{' '}
            melalui rekening di bawah ini.
          </Text>
          <Stack spacing="6">
            {technofest.payments.map((item, key) => (
              <Box key={key}>
                <Group spacing={6}>
                  <Badge variant="filled" color={paymentBankToColor(item.bank)}>
                    {item.bank}
                  </Badge>
                  <Text weight={600}>{item.number}</Text>
                  <Text color="gray.6">a.n.&nbsp;{item.name}</Text>
                </Group>
              </Box>
            ))}
          </Stack>
          <Stack>
            <Text>Unggah bukti pembayaran pada form di bawah ini dan tunggu konfirmasi dari panitia.</Text>
            <FileInput
              placeholder="Unggah bukti pembayaran"
              icon={<IconUpload size={rem(14)} />}
              {...form.getInputProps('proof')}
              disabled={!confirmed && max_participants > 1}
            />
            <Group position="right">
              <Button
                onClick={(event) => handleSubmit(event)}
                px="md"
                compact
                radius="xl"
                variant="filled"
                color="green"
                loading={loading}
                disabled={!confirmed && max_participants > 1}
              >
                Unggah
              </Button>
            </Group>
          </Stack>
        </Stack>
      )}
    </CardListItem>
  );
}
