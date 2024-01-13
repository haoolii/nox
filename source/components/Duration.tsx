import { Box, BoxProps, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

import { ALERT_SEVERITY, alertSeverity } from '../contexts/AlertsContext';

const Duration: React.FC<{ delay?: number; severity: ALERT_SEVERITY } & BoxProps> = ({
  delay = 2,
  severity,
  ...props
}) => {
  const theme = useTheme();
  const color = theme.colors.schema[alertSeverity[severity]];
  const [width, setWidth] = useState(100);

  useEffect(() => {
    setWidth(0);
  }, []);

  return (
    <Box
      sx={{
        background: color,
        height: '2px',
        width: `${width}%`,
        transition: `width ${delay}s ease-out`,
      }}
      {...props}
    />
  );
};

export default Duration;
