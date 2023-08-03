'use client';

import type { TextProps } from '@mantine/core';
import { Card, Group, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';

import Paragraph from '@/components/Molecules/paragraph';
import { countdown } from '@/lib/utils/time';

import { useStyles } from './styles';

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

  const { classes } = useStyles();

  return (
    <Group className={classes.group}>
      <Card className={classes.card}>
        <Stack spacing={0} className={classes.stack}>
          <Text size="1.6rem" color="gray.7" weight={600}>
            {count.days}
          </Text>
          <Paragraph>hari</Paragraph>
        </Stack>
      </Card>
      <Card className={classes.card}>
        <Stack spacing={0} className={classes.stack}>
          <Text size="1.6rem" color="gray.7" weight={600}>
            {count.hours}
          </Text>
          <Paragraph>jam</Paragraph>
        </Stack>
      </Card>
      <Card className={classes.card}>
        <Stack spacing={0} className={classes.stack}>
          <Text size="1.6rem" color="gray.7" weight={600}>
            {count.minutes}
          </Text>
          <Paragraph>menit</Paragraph>
        </Stack>
      </Card>
      <Card className={classes.card}>
        <Stack spacing={0} className={classes.stack}>
          <Text size="1.6rem" color="gray.7" weight={600}>
            {count.seconds}
          </Text>
          <Paragraph>detik</Paragraph>
        </Stack>
      </Card>
    </Group>
  );
}
