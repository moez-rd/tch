import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  svg: {
    width: '100%',
    transform: 'scale(1.4)',

    [theme.fn.smallerThan('sm')]: {
      transform: 'scale(4)',
    },
  },
}));
