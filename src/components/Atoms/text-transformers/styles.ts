import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  text: {
    fontSize: '1.8rem',
    fontFamily: 'monospace',
    color: theme.colors.gray[7],
    fontWeight: 300,
    letterSpacing: '0.1rem',

    [theme.fn.smallerThan('sm')]: {
      fontSize: '1.2rem',
    },
  },
}));
