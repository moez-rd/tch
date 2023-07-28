import BaseContainer from '@/components/Atoms/base-container';
import PrivacyPolicyBody from '@/components/Organisms/privacy-policy/body';
import PrivacyPolicyHeader from '@/components/Organisms/privacy-policy/header';

/**
 * Props interface
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {}

/**
 * React page
 *
 * @param props
 * @returns
 */
export default async function FaqsPage(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return (
    <BaseContainer>
      <PrivacyPolicyHeader />
      <PrivacyPolicyBody />
    </BaseContainer>
  );
}
