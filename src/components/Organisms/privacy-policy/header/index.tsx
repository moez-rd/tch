// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Container from '@/components/Atoms/container';
import PageHeader from '@/components/Molecules/page-header';

interface Props {}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function PrivacyPolicyHeader(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return (
    <Container>
      <PageHeader>Kebijakan Pribadi</PageHeader>
    </Container>
  );
}
