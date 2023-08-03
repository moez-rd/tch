import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  card: {
    padding: theme.spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(1px)',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
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
