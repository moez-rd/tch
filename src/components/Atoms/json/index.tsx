'use client';

import { Text } from '@mantine/core';

interface Props {
  data: unknown;
}

export default function Json(props: Props) {
  const { data } = props;

  return (
    <Text size="xs">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Text>
  );
}
