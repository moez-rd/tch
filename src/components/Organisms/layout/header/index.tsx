'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box, Burger, Button, Collapse, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import type { Session } from 'next-auth';

import Container from '@/components/Atoms/container';
import LayoutHeaderAuth from '@/components/Molecules/layout-header-auth';
import LayoutHeaderDropdowm from '@/components/Molecules/layout-header-dropdowm';
import LayoutHeaderLink from '@/components/Molecules/layout-header-link';
import LayoutHeaderMobileAuth from '@/components/Molecules/layout-header-mobile-auth';
import LayoutHeaderMobileLink from '@/components/Molecules/layout-header-mobile-link';
import LayoutHeaderMobileSublink from '@/components/Molecules/layout-header-mobile-sublink';
import { paths } from '@/config/paths';
import { technofest } from '@/config/technofest';
import { route } from '@/lib/utils/path';
import type { Competition, Event, Seminar } from '@/types/technofest';

import { useStyles } from './header.styles';

interface Props {
  session: Session | null;
  competitions: Event<Competition>[];
  seminars: Event<Seminar>[];
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function LayoutHeader(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { session, seminars, competitions } = props;

  const [mobileNavOpened, { toggle: toggleMobileNav }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const competitionLinks = competitions.map((competition) => {
    return {
      label: competition.name,
      sublabel: competition.description as string,
      link: route(paths.eventDetail, { eventCodename: competition.codename }),
    };
  });

  const seminarLinks = seminars.map((seminar) => {
    return {
      label: seminar.name,
      sublabel: seminar.description as string,
      link: route(paths.eventDetail, { eventCodename: seminar.codename }),
    };
  });

  return (
    <Box>
      <Box h={60} py="xs" sx={{ borderBottom: `1px solid ${theme.colors.gray[2]}` }}>
        <Container>
          <Group position="apart" sx={{ height: '100%' }}>
            <Group>
              <Link href={{ pathname: technofest.homePath }}>
                <Box component={Image} src="/technofest.png" alt="Technofest" width={28} height={28} w="100%" h="100%" />
              </Link>
              <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                <LayoutHeaderDropdowm label="Kompetisi" links={competitionLinks} />
                <LayoutHeaderDropdowm label="Seminar" links={seminarLinks} />
                <LayoutHeaderLink label="Tentang" link="/#about" />
                <LayoutHeaderLink label="Faqs" link={route(paths.faqs)} />
              </Group>
            </Group>

            <LayoutHeaderAuth session={session} />

            <Group className={classes.hiddenDesktop}>
              {session && (
                <Button component={Link} href={route(paths.userDashboard)} variant="subtle">
                  Dashboard
                </Button>
              )}

              <Burger opened={mobileNavOpened} onClick={toggleMobileNav} />
            </Group>
          </Group>
        </Container>
      </Box>

      <Collapse in={mobileNavOpened}>
        <Box sx={{ borderBottom: `1px solid ${theme.colors.gray[2]}` }}>
          <Container>
            <Stack spacing={0} py={20}>
              <LayoutHeaderMobileSublink label="Kompetisi" links={competitionLinks} />
              <LayoutHeaderMobileSublink label="Seminar" links={seminarLinks} />
              <LayoutHeaderMobileLink label="Tentang" link="#" />
              <LayoutHeaderMobileLink label="Faqs" link={route(paths.faqs)} />
              <LayoutHeaderMobileAuth session={session} />
            </Stack>
          </Container>
        </Box>
      </Collapse>
    </Box>
  );
}