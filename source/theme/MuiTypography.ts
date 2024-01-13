import { Colors, GetComponentStyleFunc } from './types';

export const muiTypography: GetComponentStyleFunc<'MuiTypography'> = (colors: Colors) => {
  return {
    defaultProps: {
      variant: 'body1',
      variantMapping: {
        h1: 'h1',
        h2: 'div',
        h3: 'div',
        h4: 'div',
        h5: 'div',
        h6: 'div',
        subtitle1: 'div',
        subtitle2: 'div',
        body1: 'div',
        body2: 'div',
      },
    },
    styleOverrides: {
      paragraph: {},
      caption: {},
      button: {},
      inherit: {},
      overline: {},
      h1: {},
      h2: {
        fontWeight: 600,
        fontSize: '24px',
        lineHeight: '36px',
      },
      h3: {
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: '30px',
      },
      h4: {
        fontWeight: 600,
        fontSize: '18px',
        lineHeight: '28px',
      },
      h5: {
        color: colors.functional.text.primary,
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
      },
      h6: {},
      subtitle1: {
        fontWeight: 400,
        fontSize: '13px',
        lineHeight: '18px',
      },
      subtitle2: {
        fontSize: '13px',
        lineHeight: '20px',
      },
      body1: {
        color: colors.functional.text.primary,
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
      },
      body2: {
        color: colors.functional.text.primary,
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
      },
    },
  };
};
