import { IconBrandWhatsapp, IconCash, IconFile, IconTicket, IconUser } from '@tabler/icons-react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import BaseContainer from '@/components/Atoms/base-container';
import RegistrationStepper from '@/components/Molecules/registration-stepper';
import RegistrationStepperItem from '@/components/Molecules/registration-stepper-item';
import RegisterActionButtons from '@/components/Organisms/user/register/action-buttons';
import RegisterCompetitionSubmission from '@/components/Organisms/user/register/competition-submission';
import RegisterEventInformation from '@/components/Organisms/user/register/event-information';
import RegisterHeader from '@/components/Organisms/user/register/header';
import RegisterPayment from '@/components/Organisms/user/register/payment';
import RegisterRegistrantInformation from '@/components/Organisms/user/register/registrant-information';
import RegisterWhatsappGroup from '@/components/Organisms/user/register/whatsapp-group';
import { appConfig } from '@/config/app';
import { technofest } from '@/config/technofest';
import { EventRegistrationRole, EventType, PaymentStatus } from '@/enums/constants';
import { ErrorCode } from '@/enums/error-code';
import { options } from '@/lib/auth/nextauth';
import { redirectIfNotAuthenticated } from '@/lib/auth/redirect';
import { getServerSanctumToken } from '@/lib/auth/token';
import { eventsGetByCodename, userGetRegistrationByEventCodename } from '@/lib/fetch/v1';
import type { Competition, Event, Seminar, User } from '@/types/technofest';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  params: {
    codename: string;
  };
}

/**
 *
 * @param props
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  // eslint-disable-next-line no-empty-pattern
  const { params } = props;

  const event = await eventsGetByCodename(params.codename);

  return {
    title: `Registrasi ${event.data?.name} - ${appConfig.title}`,
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
  const { params } = props;

  await redirectIfNotAuthenticated();

  const registration = await userGetRegistrationByEventCodename(getServerSanctumToken() as string, params.codename);

  if (registration.status === 404 && registration.error_code === ErrorCode.NOT_FOUND) {
    redirect(technofest.authenticatedHomePath);
  }

  const competition = registration.data?.event?.eventable_type === EventType.COMPETITION ? (registration.data?.event as Event<Competition>) : undefined;

  const session = await getServerSession(options);

  const maxParticipants = (competition && competition.eventable?.max_participants) || 1;

  const currentUser = registration.data?.users!.find((user) => user.id === session?.user?.id);

  const paymentAccepted = registration.data?.event_registration_payment?.status === PaymentStatus.ACCEPTED;

  return (
    <BaseContainer spacing="small">
      <RegisterHeader />

      <RegisterActionButtons currentUser={currentUser as User} registrationUid={registration.data?.uid as string} />

      <RegistrationStepper>
        <RegistrationStepperItem bullet={<IconTicket size={16} />} title="Informasi Event">
          <RegisterEventInformation event={registration.data?.event as Event<Competition | Seminar>} />
        </RegistrationStepperItem>

        <RegistrationStepperItem bullet={<IconUser size={16} />} title={`Informasi ${maxParticipants === 1 ? 'Peserta' : 'Tim'}`}>
          <RegisterRegistrantInformation
            users={registration.data?.users as User[]}
            session={session}
            registrationUid={registration.data?.uid as string}
            registrationName={registration.data?.name as string}
            confirmed={registration.data?.confirmed as number}
            max_participants={maxParticipants}
          />
        </RegistrationStepperItem>

        {registration.data?.event_registration_payment && currentUser?.event_registrant?.role !== EventRegistrationRole.MEMBER && (
          <RegistrationStepperItem bullet={<IconCash size={16} />} title="Pembayaran">
            <RegisterPayment
              payment={registration.data.event_registration_payment}
              price={registration.data.event?.price as number}
              registrationUid={registration.data.uid}
              confirmed={registration.data.confirmed}
              max_participants={maxParticipants}
            />
          </RegistrationStepperItem>
        )}

        {currentUser?.event_registrant?.role !== EventRegistrationRole.MEMBER && (
          <RegistrationStepperItem bullet={<IconBrandWhatsapp size={16} />} title="Grup WhatsApp">
            <RegisterWhatsappGroup whatsapp={registration.data?.event?.group_link as string} paymentAccepted={paymentAccepted} />
          </RegistrationStepperItem>
        )}

        {competition && currentUser?.event_registrant?.role !== EventRegistrationRole.MEMBER && (
          <RegistrationStepperItem bullet={<IconFile size={16} />} title="Submission">
            <RegisterCompetitionSubmission submission={competition.eventable?.submission as string} paymentAccepted={paymentAccepted} />
          </RegistrationStepperItem>
        )}
      </RegistrationStepper>
    </BaseContainer>
  );
}
