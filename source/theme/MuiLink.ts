import { Colors, GetComponentStyleFunc } from './types';

export const muiLink: GetComponentStyleFunc<'MuiLink'> = (colors: Colors) => {
  return {
    styleOverrides: {
      root: {
        fontSize: '14px',
        textDecoration: 'none',
        color: colors.schema.secondary,
      },
    },
  };
};
