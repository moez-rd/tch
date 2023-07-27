import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));
