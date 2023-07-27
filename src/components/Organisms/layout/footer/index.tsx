'use client';

import { Box, Container, Grid, Group, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import { technofest } from '@/config/technofest';

import { useStyles } from './footer.styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function LayoutFooter(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  const { classes, theme } = useStyles();

  return (
    <Box className={classes.footer}>
      <Container className={classes.inner}>
        <Stack maw="20rem" align="start">
          <Box component={Link} href={{ pathname: technofest.homePath }} sx={{ textDecoration: 'none', color: theme.colors.gray[8] }}>
            <Group>
              <Box component={Image} src="/technofest.png" alt="Technofest" width={28} height={28} w="28" h="auto" />
              <Text color="gray.1">Technofest 2023</Text>
            </Group>
          </Box>
          <Text size="xs" color="dimmed">
            Technology Festival 2023. Himpunan Mahasiswa Jurusan Sistem Komputer Universitas Sriwijaya.
          </Text>
          <Text size="xs" color="dimmed">
            &copy; Copyright {new Date().getFullYear()} - Built by Infokom Himasisko
          </Text>
        </Stack>
        <Grid grow>
          {technofest.footerLinks.map((footerLink) => (
            <Grid.Col span={4}>
              <div className={classes.wrapper} key={footerLink.title}>
                <Text className={classes.title}>{footerLink.title}</Text>
                {footerLink.links.map((link, index) => (
                  <Text key={index} className={classes.link} component={Link} href={link.link} onClick={(event) => event.preventDefault()}>
                    {link.label}
                  </Text>
                ))}
              </div>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
