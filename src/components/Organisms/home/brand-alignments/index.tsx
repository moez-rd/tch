'use client';

import { Box, Card, Flex, Stack } from '@mantine/core';
import Image from 'next/image';

import Container from '@/components/Atoms/container';
import SectionHeader from '@/components/Molecules/section-header';
import { technofest } from '@/config/technofest';

interface Props {}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function HomeBrandAlignments(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return (
    <Container>
      <Stack spacing="6rem">
        {technofest.sponsors && (
          <Stack>
            <SectionHeader title="Sponsor" position="center" />
            <Flex wrap="wrap" justify="center" gap="xs" mt="1rem">
              {technofest.sponsors.map((sponsor, key) => (
                <Card key={key} withBorder>
                  <Box h="auto" maw="24rem">
                    <Box component={Image} w="100%" h="100%" src={sponsor.path} alt={sponsor.name} width={420} height={420} />
                  </Box>
                </Card>
              ))}
            </Flex>
          </Stack>
        )}
        <Stack>
          <SectionHeader title="Media Partner" position="center" />
          <Flex wrap="wrap" justify="center" gap="xs" mt="1rem">
            {technofest.medparts.map((medpart, key) => (
              <Card key={key} withBorder>
                <Box h="4rem" w="100%">
                  <Box component={Image} w="100%" h="100%" src={medpart.path} alt={medpart.name} width={240} height={240} />
                </Box>
              </Card>
            ))}
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
}
