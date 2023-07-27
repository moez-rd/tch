import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  title: {
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.md,
    fontWeight: 600,
    letterSpacing: '0.6rem',
    marginRight: '-0.6rem',
    marginBottom: -12,
  },
  subtitle: {
    fontSize: '2rem',
    fontWeight: 500,
  },
}));
