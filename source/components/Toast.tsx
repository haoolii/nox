import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Box, Grid, Paper, PaperProps, Typography, useTheme } from '@mui/material';

import { ALERT_SEVERITY } from '../contexts/AlertsContext';
import Duration from './Duration';
import LinkArrow from './LinkArrow';

const Toast: React.FC<
  {
    duration?: number;
    onClose?: () => void;
    severity: ALERT_SEVERITY;
    title: string;
    link?: {
      link: string;
      label: string;
    };
    desc?: string;
  } & PaperProps
> = ({ desc, duration = 5000, link, onClose, severity, title, ...props }) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        position: 'relative',
        width: '400px',
        padding: 2.5,
        background: theme.colors.functional.container.default,
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
        borderRadius: 1,
      }}
      {...props}
    >
      <Grid container>
        {severity === ALERT_SEVERITY.SUCCESS ? (
          <CheckCircleOutlinedIcon color="success" />
        ) : (
          <ErrorOutlineOutlinedIcon
            color={
              severity === ALERT_SEVERITY.ERROR || severity === ALERT_SEVERITY.WARNING
                ? 'error'
                : 'info'
            }
          />
        )}
        <Box flex={1} marginLeft={1.25}>
          <Grid alignItems="center" container justifyContent="space-between">
            <Typography
              sx={{
                paddingRight: '26px',
                wordBreak: 'break-all',
                color:
                  severity === ALERT_SEVERITY.ERROR
                    ? theme.colors.schema.error
                    : theme.colors.functional.text.primary,
              }}
              variant="body2"
            >
              {title}
            </Typography>
            <CloseIcon
              onClick={onClose}
              sx={{
                right: '22px',
                top: '22px',
                position: 'absolute',
                cursor: 'pointer',
                fill: theme.colors.functional.subject.third,
                height: '19px',
                width: '19px',
              }}
            />
          </Grid>
          {link && (
            <LinkArrow
              label={link.label}
              rel="noopener noreferrer"
              style={{
                marginTop: '10px',
              }}
              target="_blank"
              to={link.link}
            />
          )}
          {desc && (
            <Typography
              sx={{
                marginTop: '16px',
                color: theme.colors.functional.text.third,
                wordBreak: 'break-all',
                maxHeight: '150px',
                textOverflow: 'ellipsis',
                paddingRight: '12px',
                scrollbarColor: 'rebeccapurple green',
                scrollbarWidth: 'thin',
                overflowY: 'auto',
              }}
              variant="body1"
            >
              {desc}
            </Typography>
          )}
        </Box>
      </Grid>
      <Box bottom="0px" left="0px" position="absolute" right="0px">
        <Duration delay={duration / 1000} severity={severity} />
      </Box>
    </Paper>
  );
};

export default Toast;
