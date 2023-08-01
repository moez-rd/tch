'use client';

import { Box } from '@mantine/core';
import ReactMarkdown from 'react-markdown';

import Container from '@/components/Atoms/container';

interface Props {
  privacy: string;
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function PrivacyPolicyBody(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { privacy } = props;

  return (
    <Container small>
      <Box pt="3rem" color="blue.2">
        <ReactMarkdown>{privacy}</ReactMarkdown>
      </Box>
    </Container>
  );
}
