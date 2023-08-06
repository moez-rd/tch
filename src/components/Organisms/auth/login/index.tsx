'use client';

import { Alert, Anchor, Button, Divider, Group, Paper, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
import Link from 'next/link';

import Container from '@/components/Atoms/container';
import { paths } from '@/config/paths';
import { useLogin } from '@/lib/hooks/useLogin';
import { route } from '@/lib/utils/path';

interface Props {}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function AuthLogin(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  const { form, error, loading, handleLogin } = useLogin();

  return (
    <Container>
      <Paper mx="auto" mt="10rem" radius="md" p="xl" withBorder maw="28rem">
        <Title order={1} size="lg" weight={500}>
          Login dengan
        </Title>

        <Group grow mb="md" mt="md">
          <Button onClick={() => handleLogin('google')} variant="default" color="gray" leftIcon={<IconBrandGoogle />}>
            Google
          </Button>
          <Button onClick={() => handleLogin('github')} variant="default" color="gray" leftIcon={<IconBrandGithub />}>
            GitHub
          </Button>
        </Group>

        <Divider label="atau dengan" labelProps={{ color: 'gray' }} labelPosition="center" my="lg" />

        <form onSubmit={(event) => handleLogin('credentials', event)}>
          <Stack>
            <TextInput withAsterisk label="Email" placeholder="Email" radius="md" {...form.getInputProps('email')} />
            <PasswordInput withAsterisk label="Kata sandi" placeholder="Kata sandi" radius="md" {...form.getInputProps('password')} />

            {error && (
              <Alert color="red">
                <Text color="red">{error}</Text>
              </Alert>
            )}
          </Stack>

          <Stack mt="xl">
            <Button type="submit" color="green" loading={loading}>
              Login
            </Button>
            <Text color="dimmed" size="sm" ta="center">
              Belum memiliki akun?&nbsp;
              <Anchor component={Link} href={route(paths.register)} type="button" color="green">
                Registrasi
              </Anchor>
            </Text>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
