import { Colors, GetComponentStyleFunc } from './types';

export const muiPopover: GetComponentStyleFunc<'MuiPopover'> = (colors: Colors) => {
  return {
    styleOverrides: {
      paper: {
        background: colors.functional.container.default,
      },
    },
  };
};
