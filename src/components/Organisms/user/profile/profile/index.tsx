'use client';

import { Alert, Button, Card, FileInput, rem, Select, Stack, Text, TextInput } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';

import Container from '@/components/Atoms/container';
import SectionHeader from '@/components/Molecules/section-header';
import { useUserProfile } from '@/lib/hooks/useUserProfile';
import type { User } from '@/types/technofest';

interface Props {
  user: User;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function ProfileProfile(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { user } = props;

  const { form, loading, handleSubmit, error, success } = useUserProfile(user);

  return (
    <Container small>
      <SectionHeader secondary title="Data Peserta" />
      <Card withBorder mt="1rem">
        <form onSubmit={(event) => handleSubmit(event)}>
          <Stack>
            <TextInput
              description="Gunakan nama yang sesuai dengan kartu tanda siswa/mahasiswa"
              label="Nama"
              placeholder="Nama"
              {...form.getInputProps('name')}
            />

            <TextInput label="Email" disabled placeholder="Email" {...form.getInputProps('email')} />

            <TextInput
              description="Masukkan asal sekolah/universitas. Misal: Universitas Sriwijaya"
              label="Institusi"
              placeholder="Institusi"
              {...form.getInputProps('user_profile.institution')}
            />

            <Select
              label="Status"
              placeholder="Pilih status"
              data={[
                { value: '0', label: 'Siswa' },
                { value: '1', label: 'Mahasiswa' },
              ]}
              {...form.getInputProps('user_profile.education_level')}
            />

            <TextInput label="NIM/NISM" placeholder="NIM/NISM" {...form.getInputProps('user_profile.id_number')} />

            <FileInput
              icon={<IconUpload size={rem(14)} />}
              description="Unggah kartu tanda siswa/mahasiswa"
              label="Kartu tanda siswa/mahasiswa"
              placeholder="Kartu tanda siswa/mahasiswa"
              {...form.getInputProps('user_profile.id_card_image')}
            />

            <Select
              label="Jenis kelamin"
              placeholder="Pilih jenis kelamin"
              data={[
                { value: '1', label: 'Laki-laki' },
                { value: '2', label: 'Perempuan' },
              ]}
              {...form.getInputProps('user_profile.gender')}
            />

            <TextInput
              description="Nomor WhatsApp yang valid"
              label="Nomor WhatsApp"
              placeholder="Nomor WhatsApp"
              {...form.getInputProps('user_profile.whatsapp')}
            />

            {error && (
              <Alert color="red">
                <Text color="red">{error}</Text>
              </Alert>
            )}

            {success && (
              <Alert color="green">
                <Text color="green">{success}</Text>
              </Alert>
            )}
          </Stack>
          <Stack mt="xl" align="start">
            <Button type="submit" color="green" loading={loading} disabled={!form.isDirty()}>
              Simpan
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}
