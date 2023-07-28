import BaseContainer from '@/components/Atoms/base-container';
import ProfileHeader from '@/components/Organisms/user/profile/header';
import ProfilePassword from '@/components/Organisms/user/profile/password';
import ProfileProfile from '@/components/Organisms/user/profile/profile';
import { ProviderType } from '@/enums/constants';
import { redirectIfNotAuthenticated } from '@/lib/auth/redirect';
import { getServerSanctumToken } from '@/lib/auth/token';
import { userGetCurrent } from '@/lib/fetch/v1';
import type { Provider, User } from '@/types/technofest';

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
export default async function ProfilePage(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  await redirectIfNotAuthenticated();

  const user = await userGetCurrent(getServerSanctumToken() as string, ['userProfile', 'providers']);

  const hasCredentialsProvider = user.data?.providers?.filter((provider) => {
    return provider.provider !== ProviderType.CREDENTIALS;
  }) as Provider[];

  return (
    <BaseContainer>
      <ProfileHeader />
      <ProfileProfile user={user.data as User} />
      {hasCredentialsProvider.length === 0 && <ProfilePassword />}
    </BaseContainer>
  );
}
