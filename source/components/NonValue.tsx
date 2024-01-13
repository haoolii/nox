import { Typography, TypographyProps, useTheme } from '@mui/material';
import React from 'react';

const NonValue: React.FC<TypographyProps> = ({ ...props }) => {
  const theme = useTheme();

  return (
    <Typography color={theme.colors.functional.text.lint} {...props}>
      -
    </Typography>
  );
};

export default NonValue;
