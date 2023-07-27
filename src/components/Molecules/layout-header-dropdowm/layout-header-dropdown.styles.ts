import { createStyles, getStylesRef, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    cursor: 'pointer',

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colors.dark[5],
    }),

    '&:active': theme.activeStyles,

    [`&:hover .${getStylesRef('subLinkLabel')}`]: {
      color: theme.colors.green[5],
    },

    [`&:hover .${getStylesRef('subLinkSubLabel')}`]: {
      color: theme.colors.green[0],
    },
  },

  subLinkLabel: {
    ref: getStylesRef('subLinkLabel'),
  },

  subLinkSubLabel: {
    ref: getStylesRef('subLinkSubLabel'),
    color: theme.colors.gray[6],
  },
}));
