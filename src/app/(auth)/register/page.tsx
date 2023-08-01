import type { Metadata } from 'next';

import AuthRegister from '@/components/Organisms/auth/register';
import { appConfig } from '@/config/app';
import { redirectIfAuthenticated } from '@/lib/auth/redirect';

/**
 * Props interface
 */
interface Props {}

/**
 *
 * @param props
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return {
    title: `Registrasi - ${appConfig.title}`,
  };
}

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
