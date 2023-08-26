export enum UserRole {
  ADMINISTRATOR,
  MANAGER,
  PARTICIPANT,
}

export enum Gender {
  NOT_KNOWN,
  MALE,
  FEMALE,
  NOT_APPLICABLE = 9,
}

export enum EventRegistrationRole {
  INDIVIDUAL,
  LEADER,
  MEMBER,
}

export enum SeminarCastRole {
  SPEAKER,
  MODERATOR,
}

export enum EventType {
  SEMINAR = 'seminar',
  COMPETITION = 'competition',
}

export enum PaymentStatus {
  NOT_CONFIRMED,
  ACCEPTED,
  REJECTED,
}

export enum ProviderType {
  CREDENTIALS = 'credentials',
  GOOGLE = 'google',
  GITHUB = 'github',
}

export enum ParticipationMethod {
  ONLINE,
  OFFLINE,
}
