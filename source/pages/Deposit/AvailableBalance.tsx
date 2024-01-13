import { Stack, StackProps, Typography, useTheme } from '@mui/material';
import React from 'react';

import { BridgeToken } from '../../contexts/ConfigContext';
import { useTokenBalance } from '../../contexts/TokenBalanceContext';
import { Side } from '../../core/type';

const AvailableBalance: React.FC<
  {
    token: BridgeToken;
    side: Side;
  } & StackProps
> = ({ side, token, ...props }) => {
  const theme = useTheme();
  const [, display] = useTokenBalance(token, side);

  return (
    <Stack flexDirection="row" {...props}>
      <Typography color={theme.colors.functional.text.lint} variant="body1">
        Balance:&nbsp;
      </Typography>
      <Typography color={theme.colors.functional.text.primary} fontWeight="bold" variant="body1">
        {display}
      </Typography>
      <Typography color={theme.colors.functional.text.lint} variant="body1">
        &nbsp;{token.symbol.toLocaleUpperCase()}
      </Typography>
    </Stack>
  );
};

export default AvailableBalance;
