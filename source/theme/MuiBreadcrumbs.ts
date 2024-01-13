import { Colors, GetComponentStyleFunc } from './types';

export const muiBreadcrumbs: GetComponentStyleFunc<'MuiBreadcrumbs'> = (colors: Colors) => {
  return {
    styleOverrides: {
      root: {
        '& .MuiBreadcrumbs-separator': {
          color: colors.schema.secondary,
        },
      },
    },
  };
};
