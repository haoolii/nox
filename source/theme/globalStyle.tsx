import { GlobalStyles } from '@mui/material';

export const inputGlobalStyles = (
  <GlobalStyles
    styles={theme => ({
      a: {
        textDecoration: 'none',
        fontSize: '14px',
        color: theme.colors.functional.text.link,
      },
    })}
  />
);
