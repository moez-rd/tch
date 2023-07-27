'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Text } from '@mantine/core';
import { useEffect, useState } from 'react';

import { technofest } from '@/config/technofest';
import { Messenger } from '@/lib/utils/textTransformer';

interface Props {}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function TextTransformers(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  const [messenger, setMessenger] = useState(technofest.textTransformers[0]);

  useEffect(() => {
    // eslint-disable-next-line no-new
    new Messenger(setMessenger);
  }, []);

  return (
    <Text size="xl" ff="monospace" color="gray.7" weight={300} sx={{ letterSpacing: '0.1rem' }}>
      {messenger}
    </Text>
  );
}
