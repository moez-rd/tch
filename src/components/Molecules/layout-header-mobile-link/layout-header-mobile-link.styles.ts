import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  link: {
    width: '100%',
    textDecoration: 'none',
    color: theme.colors.gray[9],
    display: 'flex',
    height: '2.5rem',
    alignItems: 'center',
    justifyContent: 'stretch',
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));
