import { Stack, StackProps, Typography, useTheme } from '@mui/material';
import React from 'react';

const KeyValueLine: React.FC<{ label: string; children?: React.ReactNode } & StackProps> = ({
  children,
  label,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Stack alignItems="center" flexDirection="row" justifyContent="space-between" py={1} {...props}>
      <Typography color={theme.colors.functional.text.lint}>{label}</Typography>
      {children}
    </Stack>
  );
};

export default KeyValueLine;
