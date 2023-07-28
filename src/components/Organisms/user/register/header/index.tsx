'use client';

import Container from '@/components/Atoms/container';
import PageHeader from '@/components/Molecules/page-header';

interface Props {}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function RegisterHeader(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return (
    <Container small>
      <PageHeader>Pendaftaran</PageHeader>
    </Container>
  );
}
