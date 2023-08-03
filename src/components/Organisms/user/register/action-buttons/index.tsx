'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, CopyButton, Group, Text } from '@mantine/core';
import { IconCheck, IconCopy, IconHash, IconLogout2, IconTrash } from '@tabler/icons-react';
import React from 'react';

import Container from '@/components/Atoms/container';
import { EventRegistrationRole } from '@/enums/constants';
import { useDeleteRegistration } from '@/lib/hooks/useDeleteRegistration';
import { useLeaveRegistration } from '@/lib/hooks/useLeaveRegistration';
import type { User } from '@/types/technofest';

interface Props {
  currentUser: User;
  registrationUid: string;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function RegisterActionButtons(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { currentUser, registrationUid } = props;

  const { leave } = useLeaveRegistration(registrationUid);
  const { deleteRegistration } = useDeleteRegistration(registrationUid);

  return (
    <Container small>
      <Group position="apart">
        <Group>
          <Text size="xl">
            UID:&nbsp;
            <IconHash size="0.8em" />
            <Text span ff="monospace" weight={600}>
              {registrationUid}
            </Text>
          </Text>
          <CopyButton value={registrationUid}>
            {({ copied, copy }) => (
              <Button color={copied ? 'green' : 'blue'} compact variant="light" onClick={copy}>
                {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
              </Button>
            )}
          </CopyButton>
        </Group>
        <Group position="right">
          {currentUser.event_registrant?.role === EventRegistrationRole.MEMBER ? (
            <Button variant="subtle" color="red" onClick={(event) => leave(event)} leftIcon={<IconLogout2 size={16} />}>
              Keluar dari tim
            </Button>
          ) : (
            <Button variant="subtle" color="red" onClick={(event) => deleteRegistration(event)} leftIcon={<IconTrash size={16} />}>
              Hapus pendaftaran
            </Button>
          )}
        </Group>
      </Group>
    </Container>
  );
}
