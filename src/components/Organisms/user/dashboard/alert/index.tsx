'use client';

import { Box, Stack, useMantineTheme } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import Link from 'next/link';

import Container from '@/components/Atoms/container';
import Paragraph from '@/components/Molecules/paragraph';
import { paths } from '@/config/paths';
import { route } from '@/lib/utils/path';

interface Props {}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function DashboardAlert(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  const theme = useMantineTheme();

  return (
    <Container small>
      <Stack bg="orange.0" p="2rem" align="center">
        <IconAlertCircle size="3rem" color={theme.colors.orange[6]} />
        <Paragraph color="orange" ta="center">
          Halo kak&#129306;, silakan lengkapi&nbsp;
          <Box component={Link} href={route(paths.userProfile)} color="orange.7" sx={{ textDecoration: 'none' }}>
            data anda
          </Box>
          &nbsp;sebelum mengikuti event Technology Festival.
        </Paragraph>
      </Stack>
    </Container>
  );
}
