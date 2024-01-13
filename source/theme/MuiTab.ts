import { GetComponentStyleFunc } from './types';

export const muiTab: GetComponentStyleFunc<'MuiTab'> = colors => {
  return {
    styleOverrides: {
      root: {
        textTransform: 'none',
        flex: 1,
        margin: 0.5,
        fontSize: '18px',
        fontWeight: 600,
        height: '48px',
        borderRadius: '24px',
        minHeight: '40px',
        color: colors.functional.text.second,
        '&.Mui-selected': {
          color: colors.functional.text.primary,
          background: colors.functional.container.primary,
        },
      },
    },
  };
};

export const muiTabs: GetComponentStyleFunc<'MuiTabs'> = colors => {
  return {
    styleOverrides: {
      root: {
        borderRadius: '28px',
        width: '100%',
        '.MuiTabs-indicator': {
          display: 'none',
        },
        display: 'flex',
        padding: '4px',
        marginBottom: '0px',
        background: colors.functional.container.dark,
      },
    },
  };
};
