'use client';

import { Avatar, Badge, Button, Flex, Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';

import Container from '@/components/Atoms/container';
import CardListBase from '@/components/Molecules/card-list-base';
import CardListItem from '@/components/Molecules/card-list-item';
import CardListItemDescription from '@/components/Molecules/card-list-item-description';
import CardListItemTitle from '@/components/Molecules/card-list-item-title';
import Paragraph from '@/components/Molecules/paragraph';
import SectionHeader from '@/components/Molecules/section-header';
import { paths } from '@/config/paths';
import { getFirstLetters } from '@/lib/utils';
import { paymentStatusToColor, paymentStatusToLabel } from '@/lib/utils/converter';
import { route } from '@/lib/utils/path';
import type { EventRegistration } from '@/types/technofest';

interface Props {
  registrations: EventRegistration[];
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function DashboardSeminars(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { registrations } = props;

  return (
    <Container small>
      <SectionHeader secondary position="center" title="Seminar" />

      <CardListBase mt="1rem">
        {registrations.length !== 0 ? (
          registrations.map((registration) => (
            <CardListItem key={registration.id}>
              <Group position="apart" align="end">
                <Stack spacing={0}>
                  <CardListItemTitle>{registration.event?.name}</CardListItemTitle>
                  <CardListItemDescription>
                    Status pembayaran:&nbsp;
                    <Badge
                      size="xs"
                      variant="light"
                      color={registration.event_registration_payment && paymentStatusToColor(registration.event_registration_payment?.status)}
                    >
                      {registration.event_registration_payment && paymentStatusToLabel(registration.event_registration_payment?.status)}
                    </Badge>
                  </CardListItemDescription>
                  <Avatar.Group mt="sm">
                    {registration.users?.map((user) => (
                      <Avatar src={user.avatar} radius="xl" size="sm" key={user.id} color="green" bg="gray.3">
                        {getFirstLetters(user.name)}
                      </Avatar>
                    ))}
                  </Avatar.Group>
                </Stack>
                <Button
                  compact
                  radius="xl"
                  px="md"
                  variant="subtle"
                  component={Link}
                  href={route(paths.userEventRegisration, { eventCodename: registration.event?.codename as string })}
                >
                  Detail
                </Button>
              </Group>
            </CardListItem>
          ))
        ) : (
          <Flex align="center" justify="center" mih="8rem">
            <Stack spacing="xs" align="center">
              <Paragraph color="gray.6">Tidak ada seminar</Paragraph>
              <Text color="gray.5" size="sm">
                Seminar yang Anda ikuti akan tampil di sini
              </Text>
            </Stack>
          </Flex>
        )}
      </CardListBase>
    </Container>
  );
}
