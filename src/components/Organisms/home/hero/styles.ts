import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  title: {
    fontSize: '5rem',
    color: theme.colors.gray[9],

    [theme.fn.smallerThan('sm')]: {
      fontSize: '3rem',
    },
  },

  blob: {
    width: 1000,
    height: 1000,

    [theme.fn.smallerThan('sm')]: {
      width: 700,
      height: 800,
    },
  },

  blobContainer: {
    position: 'absolute',
    zIndex: -1,
    top: '-10rem',
    right: 0,
    left: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    opacity: 0.7,
    overflowX: 'hidden',
    width: '100vw',
  },
}));
