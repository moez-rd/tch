import BaseContainer from '@/components/Atoms/base-container';
import FaqFaqList from '@/components/Organisms/faq/faq-list';
import FaqHeader from '@/components/Organisms/faq/header';

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
      <FaqHeader />
      <FaqFaqList />
    </BaseContainer>
  );
}
