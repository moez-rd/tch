'use client';

import { useMantineTheme } from '@mantine/core';

interface Props {}

export default function Wave(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  const theme = useMantineTheme();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill={theme.colors.gray[2]}
        fillOpacity="1"
        d="M0,224L0,192L96,192L96,64L192,64L192,128L288,128L288,64L384,64L384,320L480,320L480,224L576,224L576,128L672,128L672,192L768,192L768,288L864,288L864,256L960,256L960,96L1056,96L1056,32L1152,32L1152,256L1248,256L1248,320L1344,320L1344,224L1440,224L1440,0L1344,0L1344,0L1248,0L1248,0L1152,0L1152,0L1056,0L1056,0L960,0L960,0L864,0L864,0L768,0L768,0L672,0L672,0L576,0L576,0L480,0L480,0L384,0L384,0L288,0L288,0L192,0L192,0L96,0L96,0L0,0L0,0Z"
      />
    </svg>
  );
}
