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
export default function ProfileHeader(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return (
    <Container>
      <PageHeader>Profil</PageHeader>
    </Container>
  );
}
