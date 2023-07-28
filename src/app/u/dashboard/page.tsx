import BaseContainer from '@/components/Atoms/base-container';
import DashboardAlert from '@/components/Organisms/user/dashboard/alert';
import DashboardCompetitions from '@/components/Organisms/user/dashboard/competitions';
import DashboardHeader from '@/components/Organisms/user/dashboard/header';
import DashboardSeminars from '@/components/Organisms/user/dashboard/seminars';
import { EventType } from '@/enums/constants';
import { redirectIfNotAuthenticated } from '@/lib/auth/redirect';
import { getServerSanctumToken } from '@/lib/auth/token';
import { userGetAllRegistrations, userGetCurrent } from '@/lib/fetch/v1';
import type { EventRegistration } from '@/types/technofest';

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
export default async function DashboardPage(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  await redirectIfNotAuthenticated();

  const user = await userGetCurrent(getServerSanctumToken() as string, ['userProfile']);
  const registrations = await userGetAllRegistrations(getServerSanctumToken() as string);

  const competitionRegistrations: EventRegistration[] = registrations.data?.filter(
    (registration) => registration.event?.eventable_type === EventType.COMPETITION
  ) as EventRegistration[];

  const seminarRegistrations: EventRegistration[] = registrations.data?.filter(
    (registration) => registration.event?.eventable_type === EventType.SEMINAR
  ) as EventRegistration[];

  return (
    <BaseContainer spacing="small">
      <DashboardHeader user={user.data!} />
      {!user.data?.user_profile && <DashboardAlert />}
      <DashboardCompetitions registrations={competitionRegistrations} />
      <DashboardSeminars registrations={seminarRegistrations} />
    </BaseContainer>
  );
}
