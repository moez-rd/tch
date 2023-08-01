'use client';

import { Box, Card, Flex, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import Link from 'next/link';

import Container from '@/components/Atoms/container';
import Paragraph from '@/components/Molecules/paragraph';
import SectionHeader from '@/components/Molecules/section-header';
import type { Competition, ContactPerson, Event, Seminar } from '@/types/technofest';

interface Props {
  contactPersons: ContactPerson<Event<Competition | Seminar>>[];
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function EventContactPersons(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { contactPersons } = props;

  const theme = useMantineTheme();

  return (
    <Container>
      <Card py="3rem">
        <Container small>
          <SectionHeader title="Narahubung" subtitle="Narahubung" position="center" />
          <Stack mt="2rem">
            {contactPersons.map((contactPerson) => (
              <Card withBorder key={contactPerson.id}>
                <Stack align="center" spacing="0">
                  <Title order={3} color="gray.7" size="lg">
                    {contactPerson.name}
                  </Title>
                  <Box component={Link} href={`https://wa.me/${contactPerson.whatsapp}`} sx={{ textDecoration: 'none' }} target="_blank">
                    <Paragraph>
                      <Flex align="center">
                        <IconBrandWhatsapp color={theme.colors.green[5]} />
                        &nbsp;<Text span>{contactPerson.whatsapp}</Text>
                      </Flex>
                    </Paragraph>
                  </Box>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Container>
      </Card>
    </Container>
  );
}
