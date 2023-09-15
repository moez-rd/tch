'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert, Box, Burger, Button, Collapse, Flex, Group, Stack, Text, Transition } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import Container from '@/components/Atoms/container';
import LayoutHeaderAuth from '@/components/Molecules/layout-header-auth';
import LayoutHeaderDropdowm from '@/components/Molecules/layout-header-dropdowm';
import LayoutHeaderLink from '@/components/Molecules/layout-header-link';
import LayoutHeaderMobileAuth from '@/components/Molecules/layout-header-mobile-auth';
import LayoutHeaderMobileLink from '@/components/Molecules/layout-header-mobile-link';
import LayoutHeaderMobileSublink from '@/components/Molecules/layout-header-mobile-sublink';
import { paths } from '@/config/paths';
import { technofest } from '@/config/technofest';
import { mobileNavState } from '@/lib/recoil/mobileNavAtom';
import { route } from '@/lib/utils/path';
import type { Competition, Event } from '@/types/technofest';

import { useStyles } from './header.styles';

interface Props {
  session: Session | null;
  competitions: Event<Competition>[];
  // seminars: Event<Seminar>[];
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function LayoutHeader(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { session, competitions } = props;

  const pathName = usePathname();

  const [mobileNav, setMobileNav] = useRecoilState(mobileNavState);
  const { classes, theme } = useStyles();
  const [transparent, setTransparent] = useState(false);

  const competitionLinks = competitions.map((competition) => {
    return {
      label: competition.name,
      sublabel: competition.description as string,
      link: route(paths.eventDetail, { eventCodename: competition.codename }),
    };
  });

  const toggleMobileNav = () => {
    setMobileNav((prev) => {
      return {
        ...prev,
        opened: !mobileNav.opened,
      };
    });
  };

  useEffect(() => {
    function handleNavbar() {
      setTransparent(window.scrollY > 10);
    }

    window.onscroll = () => {
      handleNavbar();
    };
  });

  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 1,
        backdropFilter: 'blur(10px)',
        backgroundColor: `rgba(255, 255, 255, ${transparent || mobileNav.opened ? 0.85 : 0.0})`,
      }}
    >
      {pathName === paths.home && (
        <Transition mounted={!transparent} transition="slide-down" duration={100} timingFunction="ease">
          {(styles) => (
            <Box style={styles}>
              <Alert color="violet" variant="filled" radius="0">
                <Flex justify="center">
                  <Box>
                    <Text weight={600} span>
                      Pendafaran seminar Technofest 2023 telah dibuka🎉🎉🎉.
                    </Text>
                    &nbsp;
                    <Box component={Link} href={paths.userEvents} sx={{ color: 'white' }}>
                      <Group display="inline-flex" spacing={0}>
                        <Text span>Daftar</Text>
                        <IconArrowRight size={16} />
                      </Group>
                    </Box>
                  </Box>
                </Flex>
              </Alert>
            </Box>
          )}
        </Transition>
      )}
      <Box h={60} py="xs" sx={{ borderBottom: transparent || mobileNav.opened ? `1px solid ${theme.colors.gray[2]}` : '' }}>
        <Container>
          <Group position="apart" sx={{ height: '100%' }}>
            <Group>
              <Link href={{ pathname: technofest.homePath }}>
                <Box component={Image} src="/technofest.png" alt="Technofest" width={28} height={28} w="100%" h="100%" />
              </Link>
              <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                <LayoutHeaderDropdowm label="Kompetisi" links={competitionLinks} />
                {/*<LayoutHeaderDropdowm label="Seminar" links={seminarLinks} />*/}
                <LayoutHeaderLink label="Tentang" link="/#about" />
                <LayoutHeaderLink label="Faqs" link={route(paths.faqs)} />
                <LayoutHeaderLink label="Merchandise" link={route(paths.merchandise)} />
                <Button compact radius="xl" px={0} mx={theme.spacing.md} variant="gradient" gradient={{ from: 'violet', to: 'indigo' }}>
                  <LayoutHeaderLink label="Seminar" link={route(paths.seminarDetail)} colorWhite />
                </Button>
              </Group>
            </Group>

            <LayoutHeaderAuth session={session} />

            <Group className={classes.hiddenDesktop}>
              {session && (
                <Button component={Link} href={route(paths.userDashboard)} variant="subtle">
                  Dashboard
                </Button>
              )}

              <Burger opened={mobileNav.opened} onClick={toggleMobileNav} />
            </Group>
          </Group>
        </Container>
      </Box>
      <Collapse in={mobileNav.opened}>
        <Box sx={{ borderBottom: `1px solid ${theme.colors.gray[2]}` }}>
          <Container>
            <Stack spacing={0} py={20}>
              <LayoutHeaderMobileSublink label="Kompetisi" links={competitionLinks} />
              {/*<LayoutHeaderMobileSublink label="Seminar" links={seminarLinks} />*/}
              <LayoutHeaderMobileLink label="Tentang" link="/#about" />
              <LayoutHeaderMobileLink label="Faqs" link={route(paths.faqs)} />
              <LayoutHeaderMobileLink label="Merchandise" link={route(paths.merchandise)} />
              <LayoutHeaderMobileLink label="Seminar" link={route(paths.seminarDetail)} />
              <LayoutHeaderMobileAuth session={session} />
            </Stack>
          </Container>
        </Box>
      </Collapse>
    </Box>
  );
}
