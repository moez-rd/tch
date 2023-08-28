'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box, Button, Group, Stack, Title } from '@mantine/core';
import { IconBolt } from '@tabler/icons-react';
import Link from 'next/link';

import Blob from '@/components/Atoms/blob';
import Container from '@/components/Atoms/container';
import TextTransformers from '@/components/Atoms/text-transformers';
import SectionHeader from '@/components/Molecules/section-header';
import TimeCount from '@/components/Molecules/time-count';
import { paths } from '@/config/paths';
import { technofest } from '@/config/technofest';
import { route } from '@/lib/utils/path';

import { useStyles } from './styles';

interface Props {}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function HomeHero(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  const { classes } = useStyles();

  const registrationTime = new Date() < technofest.registration_open_date ? technofest.registration_open_date : technofest.registration_close_date;
  const registrationTimeTitle = new Date() < technofest.registration_open_date ? 'Pembukaan pendaftaran' : 'Perpanjangan pendaftaran kompetisi';

  return (
    <Container>
      <Stack maw="40rem" mx="auto" align="center" mt="10rem" ta="center">
        <Box className={classes.blobContainer}>
          {/*<Image src="/images/blob.svg" alt="blob" width={1040} height={1040} className={classes.blob} />*/}
          <Blob />
        </Box>
        <TextTransformers />
        <Title order={1} className={classes.title}>
          Technology Festival 2023.
        </Title>
        <Group spacing="xs">
          <Button
            component={Link}
            href={route(paths.login)}
            size="md"
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 105 }}
            leftIcon={<IconBolt />}
          >
            Gabung
          </Button>
          <Button component={Link} href={technofest.guidebookLink} target="_blank" size="md" color="green" variant="outline">
            Baca Guidebook
          </Button>
        </Group>

        <Stack spacing="2rem" mt="4rem" align="center">
          <SectionHeader title={registrationTimeTitle} position="center" />
          <TimeCount time={registrationTime} />
        </Stack>
      </Stack>
    </Container>
  );
}
