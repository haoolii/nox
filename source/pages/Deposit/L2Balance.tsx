import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

import { BridgeToken } from '../../contexts/ConfigContext';
import { useTokenBalance } from '../../contexts/TokenBalanceContext';

const L2Balance: React.FC<{
  token: BridgeToken;
  side: 'l1' | 'l2';
}> = ({ side, token }) => {
  const theme = useTheme();
  const [, display] = useTokenBalance(token, side);

  return (
    <Stack
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      px={2}
      sx={{
        height: '52px',
        background: theme.colors.functional.container.dark,
        borderRadius: '4px',
      }}
    >
      <Typography color={theme.colors.functional.text.primary} variant="body1">
        Balance
      </Typography>
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography color={theme.colors.functional.text.primary} fontWeight="bold" variant="body1">
          {display}
        </Typography>
        <Typography color={theme.colors.functional.text.lint} variant="body1">
          &nbsp;{token.symbol.toLocaleUpperCase()}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default L2Balance;
