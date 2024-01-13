import { Stack, StackProps, Typography, useTheme } from '@mui/material';
import React from 'react';

import { useConfig } from '../contexts/ConfigContext';
import { Side } from '../core/type';

const TransferDirection: React.FC<
  {
    from: Side;
  } & StackProps
> = ({ from, ...props }) => {
  const { l1, l2 } = useConfig();
  const theme = useTheme();

  return (
    <Stack flexDirection="row" justifyContent="center" pb={2.5} pt={3} {...props}>
      <Typography color={theme.colors.functional.text.second} variant="body2">
        From&nbsp;
      </Typography>
      <Typography color={theme.colors.functional.text.primary} fontWeight="bold" variant="body2">
        {from === 'l1' ? l1.name : l2.name}
      </Typography>
      <Typography color={theme.colors.functional.text.second} variant="body2">
        &nbsp;to&nbsp;
      </Typography>
      <Typography color={theme.colors.functional.text.primary} fontWeight="bold" variant="body2">
        {from === 'l2' ? l1.name : l2.name}
      </Typography>
    </Stack>
  );
};

export default TransferDirection;
