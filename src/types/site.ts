import type { Icon } from '@tabler/icons-react';

export interface Navigation {
  name: string;
  href?: string;
  description?: string;
  sub?: Navigation[];
}

export interface Link {
  name: string;
  href: string;
  icon: Icon;
}

export interface Milestone {
  date: Date;
  name: string;
  description?: string;
}
