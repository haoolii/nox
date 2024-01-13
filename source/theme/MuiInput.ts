import { alpha } from '@mui/material';

import { Colors, GetComponentStyleFunc } from './types';

export const muiOutlinedInput: GetComponentStyleFunc<'MuiOutlinedInput'> = () => {
  return {
    styleOverrides: {
      root: {
        input: {
          background: 'white',
          color: '#111111',
          fontSize: '18px',
          fontWeight: 'bold',
          borderRadius: '4px',
        },
      },
    },
  };
};

export const muiInput: GetComponentStyleFunc<'MuiInputBase'> = (colors: Colors) => {
  return {
    styleOverrides: {
      root: {
        input: {
          color: alpha(colors.functional.text.primary, 0.7),
        },
        '&.MuiInput-underline::before': {
          borderBottomColor: '#7e7e8c',
        },
        '&.MuiInput-underline:hover::before': {
          borderBottomColor: alpha('#7e7e8c', 0.85),
        },
      },
    },
  };
};
