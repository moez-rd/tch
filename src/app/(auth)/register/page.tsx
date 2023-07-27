import AuthRegister from '@/components/Organisms/auth/register';
import { redirectIfAuthenticated } from '@/lib/auth/redirect';

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
export default async function RegisterPage(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  await redirectIfAuthenticated();

  return (
    <div>
      <AuthRegister />
    </div>
  );
}
