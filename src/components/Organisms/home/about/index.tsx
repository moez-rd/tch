'use client';

import { Box, Grid, Stack, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';

import Container from '@/components/Atoms/container';
import Paragraph from '@/components/Molecules/paragraph';
import SectionHeader from '@/components/Molecules/section-header';

interface Props {}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function HomeAbout(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  const theme = useMantineTheme();

  const maxSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Container>
      <Grid id="about" grow align="center">
        <Grid.Col span="auto">
          <Box component={Image} src="/lady-tifa.png" alt="Lady Tifa" width={maxSm ? 200 : 280} height={maxSm ? 200 : 280} sx={{ transform: 'scale(-1, 1)' }} />
        </Grid.Col>
        <Grid.Col span={2}>
          <Stack>
            <SectionHeader title="Tentang" subtitle="Selamat Datang di Technofest 2023" />
            <Paragraph>
              Technology Festival adalah festival tahunan yang diadakan oleh Himpunan Mahasiswa Sistem Komputer Universitas Sriwijaya. Terdiri dari perlombaan
              dan seminar yang bertujuan untuk memotivasi kaum muda, terutama mahasiswa agar dapat berinovasi di dunia teknologi yang semakin maju. Technology
              Festival juga bertujuan untuk menyalurkan minat dan bakat anak muda melalui ajang perlombaan yang akan dilaksanakan pada acara tersebut.
            </Paragraph>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
