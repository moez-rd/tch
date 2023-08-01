import type { Metadata } from 'next';

import AuthLogin from '@/components/Organisms/auth/login';
import { appConfig } from '@/config/app';
import { redirectIfAuthenticated } from '@/lib/auth/redirect';

interface Props {}

/**
 *
 * @param props
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return {
    title: `Login - ${appConfig.title}`,
  };
}

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
