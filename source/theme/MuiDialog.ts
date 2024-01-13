import { Colors, GetComponentStyleFunc } from './types';

export const muiDialog: GetComponentStyleFunc<'MuiDialog'> = (colors: Colors) => {
  return {
    styleOverrides: {
      paper: {
        padding: 0,
        background: colors.functional.container.default,
        border: '1px solid rgba(255,255,255,0.04)',
        borderRadius: '16px',
        boxShadow: '0px 0px 40px 0px rgba(26,26,37,0.20)',
      },
    },
  };
};

export const muiDialogActions: GetComponentStyleFunc<'MuiDialogActions'> = () => {
  return {};
};

export const muiDialogContent: GetComponentStyleFunc<'MuiDialogContent'> = () => {
  return {
    styleOverrides: {
      root: {
        padding: 16,
      },
    },
  };
};

export const muiDialogContentText: GetComponentStyleFunc<'MuiDialogContentText'> = () => {
  return {};
};

export const muiDialogTitle: GetComponentStyleFunc<'MuiDialogTitle'> = (colors: Colors) => {
  return {
    styleOverrides: {
      root: {
        color: colors.functional.text.primary,
        fontSize: '16px',
        fontWeight: '700',
        padding: 16,
      },
    },
  };
};
