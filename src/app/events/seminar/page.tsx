'use client';

import { Button, Group, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';

import BaseContainer from '@/components/Atoms/base-container';
import Container from '@/components/Atoms/container';
import Paragraph from '@/components/Molecules/paragraph';
import { paths } from '@/config/paths';
import { route } from '@/lib/utils/path';

export default function SeminarPage() {
  return (
    <BaseContainer>
      <Container small>
        <Stack mt="6rem">
          <Title order={1} size="4rem">
            Seminar
          </Title>
          <Stack mt="2rem">
            <Text size="xl" fs="italic">
              Hai Technofolks!🚀
            </Text>
            <Paragraph>
              16 September bakalan jadi momen seru yang enggak boleh kamu lewatkan! Siap-siap buat join dalam seminar "Great Leadership & Green Tech ala Gen Z".
              Kita bakal bahas kepemimpinan keren yang bisa mengubah dunia serta peran mahasiswa di teknologi ramah lingkungan yang lagi hits. Ada pembicara
              asyik yaitu Pak Ferdi Kawi dan Pak Kemahyanto, yang bakal bikin kamu thinking out of the box!✨
            </Paragraph>
            <Paragraph>Yuk daftar sebelum tanggal 14 September.</Paragraph>
          </Stack>
          <Group spacing="xs">
            <Button size="md" component={Link} href={route(paths.userEvents)} variant="gradient" gradient={{ from: 'violet', to: 'indigo' }}>
              Daftar
            </Button>
          </Group>
        </Stack>
      </Container>

      {/*<Container>*/}
      {/*  <Card radius="md" mt="2rem" p="md" withBorder>*/}
      {/*    <SimpleGrid*/}
      {/*      breakpoints={[*/}
      {/*        { minWidth: 'xs', cols: 1 },*/}
      {/*        { minWidth: 'sm', cols: 4 },*/}
      {/*      ]}*/}
      {/*    >*/}
      {/*      {seminarCasts.map((seminarCast) => (*/}
      {/*        <Stack*/}
      {/*          key={seminarCast.id}*/}
      {/*          m={10}*/}
      {/*          p="md"*/}
      {/*          sx={{*/}
      {/*            backgroundImage: theme.fn.gradient({ from: theme.colors.gray[1], to: 'transparent', deg: 180 }),*/}
      {/*            borderRadius: theme.radius.md,*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <Image src={seminarCast.image || ''} alt={seminarCast.name} width={180} height={180} />*/}
      {/*          <Stack spacing={0}>*/}
      {/*            <Title order={3}>{seminarCast.name}</Title>*/}
      {/*            <Text ff="monospace" size="sm" color="green.7">*/}
      {/*              {seminarCast.title}*/}
      {/*            </Text>*/}
      {/*            <Paragraph mt="6px" sx={{ flexGrow: 1 }}>*/}
      {/*              {seminarCastRoleToLabel(seminarCast.role)}*/}
      {/*            </Paragraph>*/}
      {/*          </Stack>*/}
      {/*        </Stack>*/}
      {/*      ))}*/}
      {/*    </SimpleGrid>*/}
      {/*  </Card>*/}
      {/*</Container>*/}
    </BaseContainer>
  );
}
