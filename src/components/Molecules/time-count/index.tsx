'use client';

import type { TextProps } from '@mantine/core';
import { Card, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';

import Paragraph from '@/components/Molecules/paragraph';
import { countdown } from '@/lib/utils/time';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props extends TextProps {
  time: Date;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function TimeCount(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { time } = props;

  const [count, setcount] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setcount(countdown(time));
    }, 1000);
  }, [count]);

  const theme = useMantineTheme();

  const maxSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Group spacing={maxSm ? 4 : 'md'}>
      <Card withBorder padding={maxSm ? 4 : 'md'}>
        <Stack spacing="0" align="center" w="4rem">
          <Text size="1.6rem" weight={600}>
            {count.days}
          </Text>
          <Paragraph>hari</Paragraph>
        </Stack>
      </Card>
      <Card withBorder padding={maxSm ? 4 : 'md'}>
        <Stack spacing="0" align="center" w="4rem">
          <Text size="1.6rem" weight={600}>
            {count.hours}
          </Text>
          <Paragraph>jam</Paragraph>
        </Stack>
      </Card>
      <Card withBorder padding={maxSm ? 4 : 'md'}>
        <Stack spacing="0" align="center" w="4rem">
          <Text size="1.6rem" weight={600}>
            {count.minutes}
          </Text>
          <Paragraph>menit</Paragraph>
        </Stack>
      </Card>
      <Card withBorder padding={maxSm ? 4 : 'md'}>
        <Stack spacing="0" align="center" w="4rem">
          <Text size="1.6rem" weight={600}>
            {count.seconds}
          </Text>
          <Paragraph>detik</Paragraph>
        </Stack>
      </Card>
    </Group>
  );
}
