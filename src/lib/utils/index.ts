export function getFirstLetters(str: string): string {
  return str
    .split(' ')
    .map((word, index) => (index >= 2 ? '' : word.charAt(0)))
    .join('');
}

export function formatDate(date: string | Date | undefined, option: 'date' | 'time' | 'datetime' = 'date'): string | undefined {
  if (!date) {
    return undefined;
  }

  const new_date: Date = typeof date === 'string' ? new Date(date) : date;

  const locale: Intl.LocalesArgument = 'id-ID';
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const timeFormatOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  if (option === 'date') {
    return new_date.toLocaleDateString(locale, dateFormatOptions);
  }
  if (option === 'time') {
    return new_date.toLocaleTimeString(locale, timeFormatOptions);
  }

  return new_date.toLocaleString(locale, {
    ...dateFormatOptions,
    ...timeFormatOptions,
  });
}

export function formatPrice(price: number): string {
  return `Rp${price.toLocaleString('id-ID')}`;
}
