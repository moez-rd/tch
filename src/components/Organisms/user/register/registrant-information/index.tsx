'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ActionIcon, Alert, Avatar, Badge, Button, Group, Stack, Text, TextInput, UnstyledButton, useMantineTheme } from '@mantine/core';
import { IconCheck, IconEdit, IconPlus, IconPointFilled, IconX } from '@tabler/icons-react';
import type { Session } from 'next-auth';
import { useState } from 'react';

import CardListBase from '@/components/Molecules/card-list-base';
import CardListItem from '@/components/Molecules/card-list-item';
import CardListItemDescription from '@/components/Molecules/card-list-item-description';
import CardListItemTitle from '@/components/Molecules/card-list-item-title';
import { EventRegistrationRole } from '@/enums/constants';
import { useAddUserToRegistraion } from '@/lib/hooks/useAddUserToRegistraion';
import { useConfirmTeam } from '@/lib/hooks/useConfirmTeam';
import { useRemoveUserFromRegistration } from '@/lib/hooks/useRemoveUserFromRegistration';
import { useUpdateTeamName } from '@/lib/hooks/useUpdateTeamName';
import { getFirstLetters } from '@/lib/utils';
import type { User } from '@/types/technofest';

interface Props {
  users: User[];
  registrationUid: string;
  registrationName: string;
  confirmed: number;
  session: Session | null;
  max_participants: number;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function RegisterRegistrantInformation(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { users, session, registrationUid, registrationName, max_participants, confirmed } = props;

  const currentUser = users.find((user) => user.id === session?.user?.id);

  const [addUserFormOpened, setAddUserFormOpened] = useState<boolean>(false);

  const [editTeamName, setEditTeamName] = useState<boolean>(false);

  const theme = useMantineTheme();

  const { form, loading, handleSubmit, error } = useAddUserToRegistraion(registrationUid, setAddUserFormOpened);

  const {
    form: updateTeamNameForm,
    loading: updateTeamNameLoading,
    handleSubmit: handleUpdateTeamNameSubmit,
  } = useUpdateTeamName(registrationUid, registrationName, setEditTeamName);

  const { confirmTeam } = useConfirmTeam(registrationUid);

  const { removeUser } = useRemoveUserFromRegistration(registrationUid);

  return (
    <CardListBase>
      {max_participants > 1 && (
        <Stack spacing="xs" mb="lg">
          <Text>Nama Tim</Text>
          <Group spacing="xs">
            <TextInput placeholder="Nama tim" {...updateTeamNameForm.getInputProps('name')} disabled={!editTeamName} />
            {!confirmed &&
              (editTeamName ? (
                <>
                  <ActionIcon color="red" onClick={() => setEditTeamName(false)}>
                    <IconX />
                  </ActionIcon>
                  <ActionIcon color="green" onClick={(event) => handleUpdateTeamNameSubmit(event)} loading={updateTeamNameLoading}>
                    <IconCheck />
                  </ActionIcon>
                </>
              ) : (
                <ActionIcon color="blue" onClick={() => setEditTeamName(true)}>
                  <IconEdit />
                </ActionIcon>
              ))}
          </Group>
        </Stack>
      )}

      {max_participants > 1 && <Text>Peserta</Text>}
      {users.map((user) => (
        <CardListItem key={user.id}>
          <Group>
            <Avatar src={user.avatar} radius="xl" bg="gray.2">
              {getFirstLetters(user.name)}
            </Avatar>
            <Stack spacing={0} sx={{ flexGrow: 1 }}>
              <Group spacing="xs">
                <CardListItemTitle size="lg">{user.name}</CardListItemTitle>
                {user.event_registrant?.role === EventRegistrationRole.LEADER && (
                  <Badge variant="light" size="sm" color="yellow">
                    Ketua tim
                  </Badge>
                )}
              </Group>
              <Group spacing={6}>
                <CardListItemDescription>UID:&nbsp;{user.uid}</CardListItemDescription>
                <IconPointFilled size={10} />
                <CardListItemDescription>{user.email}</CardListItemDescription>
              </Group>
            </Stack>
            <Group sx={{ alignSelf: 'end' }}>
              {!confirmed && currentUser?.id !== user.id && currentUser?.event_registrant?.role === EventRegistrationRole.LEADER && (
                <Button px="md" compact radius="xl" variant="light" color="red" onClick={(event) => removeUser(event, user)}>
                  Hapus
                </Button>
              )}
            </Group>
          </Group>
        </CardListItem>
      ))}
      {!confirmed && currentUser?.event_registrant?.role === EventRegistrationRole.LEADER && users.length < max_participants && (
        <CardListItem>
          {!addUserFormOpened ? (
            <UnstyledButton onClick={() => setAddUserFormOpened(true)} w="100%" sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack spacing={0} align="center">
                <IconPlus color={theme.colors.gray[5]} />
                <Text size="sm" color="gray.5">
                  Tambah peserta
                </Text>
              </Stack>
            </UnstyledButton>
          ) : (
            <Stack spacing="xs">
              <TextInput label="Tambah peserta" placeholder="UID Peserta" {...form.getInputProps('uid')} />
              {error && (
                <Alert color="red">
                  <Text color="red">{error}</Text>
                </Alert>
              )}
              <Group spacing={6} sx={{ alignSelf: 'end' }}>
                <Button onClick={() => setAddUserFormOpened(false)} px="md" compact radius="xl" variant="outline" color="red">
                  Batal
                </Button>
                <Button onClick={(event) => handleSubmit(event)} px="md" compact radius="xl" variant="filled" color="green" loading={loading}>
                  Tambah
                </Button>
              </Group>
            </Stack>
          )}
        </CardListItem>
      )}

      {max_participants > 1 && (
        <Group mt="lg">
          {!confirmed ? (
            <Button onClick={(event) => confirmTeam(event)}>Konfirmasi tim</Button>
          ) : (
            <Badge size="lg" color="gray">
              Tim dikonfirmasi
            </Badge>
          )}
        </Group>
      )}
    </CardListBase>
  );
}
