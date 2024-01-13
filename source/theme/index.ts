import { createTheme } from '@mui/material';

import { fontCss } from './font';
import { muiBreadcrumbs } from './MuiBreadcrumbs';
import { muiButton, muiButtonBase } from './MuiButton';
import {
  muiDialog,
  muiDialogActions,
  muiDialogContent,
  muiDialogContentText,
  muiDialogTitle,
} from './MuiDialog';
import { muiInput, muiOutlinedInput } from './MuiInput';
import { muiLink } from './MuiLink';
import { muiPopover } from './MuiPopover';
import { muiRadio } from './MuiRadio';
import { muiSlider } from './MuiSlider';
import { muiSvgIcon } from './MuiSvgIcon';
import { muiTab, muiTabs } from './MuiTab';
import { muiTextField } from './MuiTextField';
import { muiTypography } from './MuiTypography';
import { Colors } from './types';

const colors: Colors = {
  schema: {
    primary: '#6667AB',
    secondary: '#9092FE',
    success: '#39BA72',
    info: '#9092FE',
    error: '#FF6F7D',
    failure: '#F83B4C',
  },
  functional: {
    text: {
      primary: '#FFFFFF',
      second: '#AFB0CC',
      third: '#A4A4B2',
      link: '#9092FE',
      lint: '#AFB0CC',
    },
    subject: {
      first: '#979797',
      third: '#646471',
      border: '#474754',
    },
    container: {
      primary: '#474754',
      default: '#373741',
      dark: '#28282F',
    },
  },
};

export const theme = createTheme({
  typography: {
    fontFamily: 'Kanit',
  },
  colors,
  palette: {
    text: { primary: colors.functional.text.primary, secondary: colors.functional.text.lint },
    primary: { main: colors.schema.primary },
    secondary: { main: colors.schema.secondary },
    error: { main: colors.schema.error },
    warning: { main: colors.schema.error },
    info: { main: colors.schema.info },
    success: { main: colors.schema.success },
    action: {
      disabledBackground: colors.functional.subject.first,
      disabled: colors.functional.text.primary,
    },
  },
  components: {
    MuiPopover: muiPopover(colors),
    MuiBreadcrumbs: muiBreadcrumbs(colors),
    MuiRadio: muiRadio(colors),
    MuiButtonBase: muiButtonBase(colors),
    MuiButton: muiButton(colors),
    MuiTextField: muiTextField(colors),
    MuiOutlinedInput: muiOutlinedInput(colors),
    MuiInput: muiInput(colors),
    MuiLink: muiLink(colors),
    MuiTypography: muiTypography(colors),
    MuiSlider: muiSlider(colors),
    MuiSvgIcon: muiSvgIcon(colors),
    MuiDialogTitle: muiDialogTitle(colors),
    MuiDialogActions: muiDialogActions(colors),
    MuiDialogContent: muiDialogContent(colors),
    MuiDialogContentText: muiDialogContentText(colors),
    MuiDialog: muiDialog(colors),
    MuiTab: muiTab(colors),
    MuiTabs: muiTabs(colors),
    MuiCssBaseline: {
      styleOverrides:
        `
        @keyframes rotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(359deg);
          }
        }
        
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Works for Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
        body {
          min-height: 100vh;
          background: #111;
        }
        #root > div[data-rk] {
          position: relative;
        }
      ` + fontCss(),
    },
  },
});
