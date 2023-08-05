'use client';

import { Box, Flex, Stack, useMantineTheme } from '@mantine/core';
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
      <Flex id="about" direction={maxSm ? 'column' : 'row'} align="center" gap={maxSm ? '3rem' : '8rem'}>
        <Box>
          <Box component={Image} src="/lady-tifa.png" alt="Lady Tifa" width={maxSm ? 200 : 280} height={maxSm ? 200 : 280} sx={{ transform: 'scale(-1, 1)' }} />
        </Box>
        <Box>
          <Stack>
            <SectionHeader title="Tentang" subtitle="Selamat Datang di Technofest 2023" />
            <Paragraph>
              Technology Festival atau yang biasa dikenal dengan Technofest adalah forum kompetitif berskala nasional yang mewadahi minat dan bakat kaum muda
              dalam dunia teknologi. Ajang kompetitif yang disediakan adalah lomba essay, poster, dan UI/UX. Technofest juga memberikan seminar untuk
              menyalurkan pengetahuan dan informasi yang berkembang pesat kepada generasi muda dengan tujuan untuk memotivasi kaum muda agar dapat berinovasi
              dan memajukan teknologi di Indonesia.
            </Paragraph>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
}
