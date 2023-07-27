'use client';

import { Alert, Anchor, Button, Divider, Group, Paper, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
import Link from 'next/link';

import Container from '@/components/Atoms/container';
import { paths } from '@/config/paths';
import { useRegister } from '@/lib/hooks/useRegister';
import { route } from '@/lib/utils/path';

interface Props {}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function AuthRegister(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  const { form, error, loading, handleRegister } = useRegister();

  return (
    <Container>
      <Paper mx="auto" mt="10rem" radius="md" p="xl" withBorder maw="28rem">
        <Text size="lg" weight={500}>
          Registrasi dengan
        </Text>

        <Group grow mb="md" mt="md">
          <Button onClick={() => handleRegister('google')} variant="default" color="gray" leftIcon={<IconBrandGoogle />}>
            Google
          </Button>
          <Button onClick={() => handleRegister('github')} variant="default" color="gray" leftIcon={<IconBrandGithub />}>
            GitHub
          </Button>
        </Group>

        <Divider label="atau dengan" labelProps={{ color: 'gray' }} labelPosition="center" my="lg" />

        <form onSubmit={(event) => handleRegister('credentials', event)}>
          <Stack>
            <TextInput
              withAsterisk
              description="Masukkan nama lengkap sesuai dengan kartu tanda siswa/mahasiswa."
              label="Nama"
              placeholder="Nama"
              radius="md"
              {...form.getInputProps('name')}
            />
            <TextInput
              withAsterisk
              description="Harap masukkan email valid milik Anda, karena akan digunakan sebagai tempat pengiriman sertifikat."
              label="Email"
              placeholder="Email"
              radius="md"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              withAsterisk
              label="Kata sandi"
              placeholder="Kata sandi"
              description="Minimal 7 karakter."
              radius="md"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              withAsterisk
              label="Konfirmasi kata sandi"
              placeholder="Konfirmasi kata sandi"
              radius="md"
              {...form.getInputProps('confirm_password')}
            />

            {error && (
              <Alert color="red">
                <Text color="red">{error}</Text>
              </Alert>
            )}
          </Stack>

          <Stack mt="xl">
            <Button type="submit" color="green" loading={loading}>
              Registrasi
            </Button>
            <Text color="dimmed" size="sm" ta="center">
              Sudah memiliki akun?&nbsp;
              <Anchor component={Link} href={route(paths.login)} type="button" color="green">
                Login
              </Anchor>
            </Text>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
