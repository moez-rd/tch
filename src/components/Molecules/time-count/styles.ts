import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  card: {
    padding: theme.spacing.md,
    backgroundColor: 'transparent',
    [theme.fn.smallerThan('sm')]: {
      padding: 4,
    },
  },
  stack: {
    alignItems: 'center',
    width: '4rem',
  },
  group: {
    spacing: 'md',
    [theme.fn.smallerThan('sm')]: {
      spacing: 4,
    },
  },
}));
