import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  title: {
    fontSize: '5rem',
    // color: theme.colors.gray[9],

    backgroundColor: theme.colors.gray[9],
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    [theme.fn.smallerThan('sm')]: {
      fontSize: '3rem',
    },
  },

  blob: {
    width: 1000,
    height: 1000,

    [theme.fn.smallerThan('sm')]: {
      width: 1900,
      height: 1900,
    },
  },

  blobContainer: {
    position: 'absolute',
    zIndex: -1,
    top: '-120vh',
    width: '100vw',
    overflowX: 'hidden',
    height: '300vh',
    filter: 'opacity(0.7)',

    [theme.fn.smallerThan('sm')]: {
      top: '-0vh',
      width: '100vw',
      height: '200vh',
    },
  },
}));
