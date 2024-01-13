import { Colors, GetComponentStyleFunc } from './types';

export const muiRadio: GetComponentStyleFunc<'MuiRadio'> = (colors: Colors) => {
  return {
    styleOverrides: {
      root: {
        padding: '8px',
        color: colors.functional.text.lint,
        '&.Mui-checked': {
          color: colors.schema.primary,
        },
        '& > span > svg.MuiSvgIcon-root': {
          width: '20px',
          height: '20px',
        },
      },
    },
  };
};
