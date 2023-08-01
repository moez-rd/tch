'use client';

import { Alert, Button, Card, Flex, Modal, Radio, Stack, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { useCreateRegistration } from '@/lib/hooks/useCreateRegistration';
import { useJoinRegistration } from '@/lib/hooks/useJoinRegistration';
import { createRegistrationModalState } from '@/lib/recoil/createRegistrationAtom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function ModalCreateRegistration(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  const [createEventRegistration, setCreateEventRegistration] = useRecoilState(createRegistrationModalState);
  const { form, loading: joinLoading, error, handleSubmit } = useJoinRegistration();
  const { createRegistration, isLoading: createLoading, form: createForm } = useCreateRegistration(true);

  const [choice, setChoice] = useState('');

  const handleModalClose = () => {
    setCreateEventRegistration((prev) => {
      return {
        ...prev,
        opened: false,
      };
    });
  };

  const handleContinueButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (choice === 'create') {
      createRegistration(createEventRegistration.eventCodename as string);
      return;
    }

    handleSubmit(event, createEventRegistration.eventCodename as string);
  };

  return (
    <Modal opened={createEventRegistration.opened} onClose={handleModalClose} title="Daftar Event" centered>
      {/* Modal content */}
      <Stack spacing="xs" align="start">
        <Radio.Group value={choice} onChange={setChoice}>
          <Stack>
            <Card withBorder w="100%">
              <Flex>
                <Radio value="create" />
                <Stack spacing={4} pl="1rem">
                  <Text weight="500" size="lg" sx={{ lineHeight: '1rem' }}>
                    Buat baru
                  </Text>
                  <Text size="sm" color="gray.6">
                    Buat pendaftaran baru, Anda akan menjadi ketua tim.
                  </Text>
                  <TextInput placeholder="Nama tim" disabled={choice !== 'create'} {...createForm.getInputProps('name')} />
                </Stack>
              </Flex>
            </Card>
            <Card withBorder w="100%">
              <Flex>
                <Radio value="join" />
                <Stack spacing={4} pl="1rem">
                  <Text weight="500" size="lg" sx={{ lineHeight: '1rem' }}>
                    Gabung tim
                  </Text>
                  <Text size="sm" color="gray.6">
                    Masuk ke pendaftaran yang sudah ada dengan memasukkan UID pendaftaran.
                  </Text>
                  <TextInput placeholder="UID pendaftaran" disabled={choice !== 'join'} {...form.getInputProps('uid')} />
                  {error && (
                    <Alert color="red">
                      <Text color="red">{error}</Text>
                    </Alert>
                  )}
                </Stack>
              </Flex>
            </Card>
            <Stack align="end">
              <Button
                loading={joinLoading || createLoading(createEventRegistration.eventCodename as string)}
                onClick={(event) => {
                  handleContinueButtonClick(event);
                }}
              >
                Lanjut
              </Button>
            </Stack>
          </Stack>
        </Radio.Group>
      </Stack>
    </Modal>
  );
}
