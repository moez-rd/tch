import { PaymentStatus, SeminarCastRole } from '@/enums/constants';

export function seminarCastRoleToLabel(number: number): string | undefined {
  switch (number) {
    case SeminarCastRole.SPEAKER:
      return 'Pembicara';
    case SeminarCastRole.MODERATOR:
      return 'Moderator';
  }

  return undefined;
}

export function paymentStatusToLabel(number: number): string | undefined {
  switch (number) {
    case PaymentStatus.NOT_CONFIRMED:
      return 'Belum dikonfirmasi';
    case PaymentStatus.ACCEPTED:
      return 'Diterima';
    case PaymentStatus.REJECTED:
      return 'Ditolak';
  }

  return undefined;
}

export function paymentStatusToColor(number: number): string | undefined {
  switch (number) {
    case PaymentStatus.NOT_CONFIRMED:
      return 'gray';
    case PaymentStatus.ACCEPTED:
      return 'green';
    case PaymentStatus.REJECTED:
      return 'red';
  }

  return undefined;
}

export function paymentBankToColor(type: string): string | undefined {
  switch (type) {
    case 'Dana':
      return 'blue';
    case 'Mandiri':
      return 'yellow';
    case 'BRI':
      return 'blue';
  }
}