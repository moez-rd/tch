'use client';

import type { TextProps } from '@mantine/core';
import { Card, SimpleGrid, Stack, Text } from '@mantine/core';
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
    <SimpleGrid cols={4} spacing="xs">
      <Card className={classes.card}>
        <Stack spacing={0} className={classes.stack}>
          <Text className={classes.title}>0</Text>
          <Paragraph>hari</Paragraph>
        </Stack>
      </Card>
      <Card className={classes.card}>
        <Stack spacing={0} className={classes.stack}>
          <Text className={classes.title}>0</Text>
          <Paragraph>jam</Paragraph>
        </Stack>
      </Card>
      <Card className={classes.card}>
        <Stack spacing={0} className={classes.stack}>
          <Text className={classes.title}>0</Text>
          <Paragraph>menit</Paragraph>
        </Stack>
      </Card>
      <Card className={classes.card}>
        <Stack spacing={0} className={classes.stack}>
          <Text className={classes.title}>0</Text>
          <Paragraph>detik</Paragraph>
        </Stack>
      </Card>
    </SimpleGrid>
  );
}
