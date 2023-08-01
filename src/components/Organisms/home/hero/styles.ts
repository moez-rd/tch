import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  title: {
    size: '6rem',
    color: 'gray.8',
    [theme.fn.smallerThan('sm')]: {
      size: '3rem',
    },
  },

  blob: {
    width: 1040,
    height: 1040,

    [theme.fn.smallerThan('sm')]: {
      width: 600,
      height: 700,
    },
  },
}));
