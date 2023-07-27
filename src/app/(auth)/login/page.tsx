import AuthLogin from '@/components/Organisms/auth/login';
import { redirectIfAuthenticated } from '@/lib/auth/redirect';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {}

/**
 * React page
 *
 * @param props
 * @returns
 */
export default async function LoginPage(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  await redirectIfAuthenticated();

  return (
    <div>
      <AuthLogin />
    </div>
  );
}
