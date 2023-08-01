import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  card: {
    padding: 'xl',
    backgroundColor: theme.colors.gray[1],
    borderRadius: 'md',

    [theme.fn.smallerThan('sm')]: {
      padding: 'xs',
    },
  },
}));
