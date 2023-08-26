import client from '@/lib/fetch/v1/axios';
import type { RecursivePartial } from '@/types/app';
import type { Avatar, Competition, Event, EventRegistration, EventRegistrationPayment, Faq, Festival, ResponseData, Seminar, User } from '@/types/technofest';

/**
 *
 */
export const csrf = () => client.get('/sanctum/csrf-cookie');

/**
 *
 * @param email
 * @param password
 * @param withToken
 */
export const attempt = async (email: string, password: string, withToken: boolean = false): Promise<ResponseData<User>> => {
  await csrf();

  const res = await client.post(
    '/api/v1/auth/credentials/attempt',
    {
      email,
      password,
    },
    { params: { token: withToken } }
  );

  return res.data;
};

/**
 *
 * @param name
 * @param email
 * @param password
 * @param withToken
 */
export const register = async (name: string, email: string, password: string, withToken: boolean = false): Promise<ResponseData<User>> => {
  await csrf();

  const res = await client.post(
    '/api/v1/auth/credentials/register',
    {
      name,
      email,
      password,
    },
    { params: { token: withToken } }
  );

  return res.data;
};

/**
 *
 * @param name
 * @param email
 * @param avatar
 * @param provider
 * @param provider_id
 * @param access_token
 */
export const login = async (
  name: string,
  email: string,
  avatar: string,
  provider: string,
  provider_id: string,
  access_token: string
): Promise<ResponseData<User>> => {
  await csrf();

  const res = await client.post('/api/v1/auth/login', {
    name,
    email,
    avatar,
    provider,
    provider_id,
    access_token,
  });

  return res.data;
};

/**
 *
 * @param token
 * @param relations
 */
export const userGetCurrent = async (token: string, relations?: string[]): Promise<ResponseData<User>> => {
  const res = await client.get('/api/v1/user', {
    params: {
      rel: relations,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/**
 *
 * @param token
 * @param user
 */
export const userUpdateProfile = async (token: string, user: RecursivePartial<User>): Promise<ResponseData<User>> => {
  await csrf();

  const res = await client.put(
    '/api/v1/user',
    { ...user },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/**
 *
 * @param token
 * @param old_password
 * @param new_password
 */
export const userUpdatePassword = async (token: string, old_password: string, new_password: string): Promise<ResponseData<null>> => {
  await csrf();

  const res = await client.put(
    '/api/v1/user/password',
    { old_password, new_password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/**
 *
 * @param token
 */
export const userLogout = async (token: string) => {
  const res = await client.post(
    '/api/v1/user/auth/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/**
 *
 * @param token
 */
export const userGetAllEvents = async (token: string): Promise<ResponseData<Event<Competition | Seminar>[]>> => {
  const res = await client.get('/api/v1/user/events', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/**
 *
 * @param token
 * @param codename
 */
export const userGetRegistrationByEventCodename = async (token: string, codename: string): Promise<ResponseData<EventRegistration>> => {
  const res = await client.get(`/api/v1/user/events/${codename}/registration`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/**
 *
 * @param token
 * @param codename
 * @param body
 */
export const userCreateRegistrationByEventCodename = async (
  token: string,
  codename: string,
  body?: { teamName?: string; participationMethod?: string }
): Promise<ResponseData<EventRegistration>> => {
  await csrf();

  const res = await client.post(
    `/api/v1/user/events/${codename}/registration`,
    { name: body!.teamName, participation_method: body!.participationMethod },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/**
 *
 * @param token
 */
export const userGetAllRegistrations = async (token: string): Promise<ResponseData<EventRegistration[]>> => {
  const res = await client.get(`/api/v1/user/registrations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/**
 *
 * @param token
 * @param registrationUid
 * @param registration
 */
export const userUpdateRegistrationByUid = async (
  token: string,
  registrationUid: string,
  registration: RecursivePartial<EventRegistration>
): Promise<ResponseData<EventRegistration>> => {
  await csrf();

  const res = await client.put(
    `/api/v1/user/registrations/${registrationUid}`,
    {
      ...registration,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/**
 *
 * @param token
 * @param registrationUid
 */
export const userDeleteRegistrationByUid = async (token: string, registrationUid: string) => {
  const res = await client.delete(`/api/v1/user/registrations/${registrationUid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/**
 *
 * @param token
 * @param uid
 */
export const userAttachToRegistrationByUid = async (token: string, uid: string): Promise<ResponseData<undefined>> => {
  const res = await client.post(
    `/api/v1/user/registrations/${uid}/attach`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/**
 *
 * @param token
 * @param uid
 */
export const userDetachFromRegistrationByUid = async (token: string, uid: string): Promise<ResponseData<undefined>> => {
  await csrf();

  const res = await client.delete(`/api/v1/user/registrations/${uid}/detach`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/**
 *
 * @param token
 * @param registrationUid
 * @param userUid
 */
export const userAttachOtherUserToRegistrationByUid = async (token: string, registrationUid: string, userUid: string): Promise<ResponseData<undefined>> => {
  const res = await client.post(
    `/api/v1/user/registrations/${registrationUid}/users/${userUid}/attach`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/**
 *
 * @param token
 * @param registrationUid
 * @param userUid
 */
export const userDetachOtherUserFromRegistrationByUid = async (token: string, registrationUid: string, userUid: string): Promise<ResponseData<undefined>> => {
  await csrf();

  const res = await client.delete(`/api/v1/user/registrations/${registrationUid}/users/${userUid}/detach`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/**
 *
 * @param token
 * @param paymentId
 */
export const userGetPaymentById = async (token: string, paymentId: string): Promise<ResponseData<EventRegistrationPayment>> => {
  const res = await client.get(`/api/v1/user/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/**
 *
 * @param token
 * @param paymentId
 * @param payment
 */
export const userUpdatePaymentById = async (
  token: string,
  paymentId: string,
  payment: RecursivePartial<EventRegistrationPayment>
): Promise<ResponseData<EventRegistrationPayment>> => {
  await csrf();

  const res = await client.put(
    `/api/v1/user/payments/${paymentId}`,
    {
      ...payment,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/**
 *
 */
export const festivalGetCurrent = async (): Promise<ResponseData<Festival>> => {
  const res = await client.get('/api/v1/festivals/current');

  return res.data;
};

/**
 *
 */
export const eventsGetAll = async (): Promise<ResponseData<Event<Competition> | Seminar>[]> => {
  const res = await client.get('/api/v1/events');

  return res.data;
};

/**
 *
 * @param codename
 */
export const eventsGetByCodename = async (codename: string): Promise<ResponseData<Event<Competition | Seminar>>> => {
  const res = await client.get(`/api/v1/events/${codename}`);

  return res.data;
};

/**
 *
 * @param codename
 */
export const eventsGetEventableTypeByCodename = async (codename: string): Promise<ResponseData<string>> => {
  const res = await client.get(`/api/v1/events/${codename}/type`);

  return res.data;
};

/**
 *
 */
export const competitionsGetAll = async (): Promise<ResponseData<Event<Competition>[]>> => {
  const res = await client.get('/api/v1/competitions');

  return res.data;
};

/**
 *
 * @param codename
 */
export const competitionsGetByCodename = async (codename: string): Promise<ResponseData<Event<Competition>>> => {
  const res = await client.get(`/api/v1/competitions/${codename}`);

  return res.data;
};

/**
 *
 */
export const seminarsGetAll = async (): Promise<ResponseData<Event<Seminar>[]>> => {
  const res = await client.get('/api/v1/seminars');

  return res.data;
};

/**
 *
 * @param codename
 */
export const seminarsGetByCodename = async (codename: string): Promise<ResponseData<Event<Seminar>>> => {
  const res = await client.get(`/api/v1/seminars/${codename}`);

  return res.data;
};

/**
 *
 */
export const faqsGetAll = async (): Promise<ResponseData<Faq[]>> => {
  const res = await client.get('/api/v1/faqs');

  return res.data;
};

/**
 *
 */
export const avatarsGetAll = async (): Promise<ResponseData<Avatar[]>> => {
  const res = await client.get('/api/v1/avatars');

  return res.data;
};
