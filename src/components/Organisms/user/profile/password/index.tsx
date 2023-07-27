'use client';

import { Alert, Button, Card, PasswordInput, Stack, Text } from '@mantine/core';

import Container from '@/components/Atoms/container';
import SectionHeader from '@/components/Molecules/section-header';
import { useUserPassword } from '@/lib/hooks/useUserPassword';

interface Props {}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function ProfilePassword(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  const { form, loading, handleSubmit, error, success } = useUserPassword();

  return (
    <Container small>
      <SectionHeader secondary title="Kata Sandi" />
      <Card withBorder mt="1rem">
        <form onSubmit={(event) => handleSubmit(event)}>
          <Stack>
            <PasswordInput label="Kata sandi lama" placeholder="Kata sandi lama" {...form.getInputProps('old_password')} />
            <PasswordInput label="Kata sandi baru" placeholder="Kata sandi baru" {...form.getInputProps('new_password')} />
            <PasswordInput label="Konfirmasi kata sandi baru" placeholder="Konfirmasi kata sandi baru" {...form.getInputProps('confirm_new_password')} />
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
              Perbarui
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}
