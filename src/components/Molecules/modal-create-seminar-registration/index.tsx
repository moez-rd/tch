'use client';

import { Button, Card, Flex, Modal, Radio, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { ParticipationMethod } from '@/enums/constants';
import { useCreateSeminarRegistration } from '@/lib/hooks/useCreateSeminarRegistration';
import { createSeminarRegistrationModalState } from '@/lib/recoil/createSeminarRegistrationAtom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function ModalCreateSeminarRegistration(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  const [createEventRegistration, setCreateEventRegistration] = useRecoilState(createSeminarRegistrationModalState);
  const { createRegistration, isLoading: createLoading } = useCreateSeminarRegistration();

  const [choice, setChoice] = useState('');

  const handleModalClose = () => {
    setCreateEventRegistration((prev) => {
      return {
        ...prev,
        opened: false,
      };
    });
  };

  const handleContinueButtonClick = () => {
    if (choice === 'offline') {
      createRegistration(createEventRegistration.eventCodename as string, ParticipationMethod.OFFLINE);
      return;
    }

    createRegistration(createEventRegistration.eventCodename as string, ParticipationMethod.ONLINE);
  };

  return (
    <Modal opened={createEventRegistration.opened} onClose={handleModalClose} title="Pilih metode partisipasi" centered>
      {/* Modal content */}
      <Stack spacing="xs" align="start">
        <Radio.Group value={choice} onChange={setChoice}>
          <Stack>
            <Card withBorder w="100%">
              <Flex>
                <Radio value="offline" />
                <Stack spacing={4} pl="1rem">
                  <Text weight="500" size="lg" sx={{ lineHeight: '1rem' }}>
                    Offline
                  </Text>
                  <Text size="sm" color="gray.6">
                    Lantai 7 Gedung Fasilkom Universitas Sriwijaya Palembang.
                  </Text>
                  {/*<Text weight={600} color="gray.6" fs="italic">*/}
                  {/*  Pendaftaran sudah penuh*/}
                  {/*</Text>*/}
                </Stack>
              </Flex>
            </Card>
            <Card withBorder w="100%">
              <Flex>
                <Radio value="online" />
                <Stack spacing={4} pl="1rem">
                  <Text weight="500" size="lg" sx={{ lineHeight: '1rem' }}>
                    Online
                  </Text>
                  <Text size="sm" color="gray.6">
                    Daring melalui aplikasi Zoom.
                  </Text>
                </Stack>
              </Flex>
            </Card>
            <Stack align="end">
              <Button loading={createLoading(createEventRegistration.eventCodename as string)} onClick={handleContinueButtonClick}>
                Lanjut
              </Button>
            </Stack>
          </Stack>
        </Radio.Group>
      </Stack>
    </Modal>
  );
}
