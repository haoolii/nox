import { darken } from '@mui/material';

import { Colors, GetComponentStyleFunc } from './types';

export const muiButton: GetComponentStyleFunc<'MuiButton'> = (colors: Colors) => {
  return {
    defaultProps: {
      size: 'large',
      variant: 'contained',
    },
    styleOverrides: {
      root: {
        borderRadius: '4px',
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '14px',
        '&.MuiLoadingButton-root.MuiLoadingButton-loading': {
          opacity: 1,
          background: darken(colors.schema.primary, 0.3),
        },
      },
      containedSizeLarge: {
        height: '56px',
      },
      outlinedSizeLarge: {
        height: '56px',
      },
    },
  };
};

export const muiButtonBase: GetComponentStyleFunc<'MuiButtonBase'> = () => {
  return {
    styleOverrides: {
      root: {
        '&.Mui-disabled': {
          opacity: 0.5,
        },
      },
    },
  };
};
