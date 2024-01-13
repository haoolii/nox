import { Stack, StackProps, Typography, useTheme } from '@mui/material';
import React from 'react';

import { BridgeToken } from '../contexts/ConfigContext';
import { useTokenBalance } from '../contexts/TokenBalanceContext';
import { Side } from '../core/type';
import TokenLogo from './TokenLogo';

const Token: React.FC<
  {
    token: BridgeToken;
    onChoose: (token: BridgeToken) => void;
    selected: boolean;
    side: Side;
  } & StackProps
> = ({ onChoose, selected, side, sx, token, ...props }) => {
  const [, display] = useTokenBalance(token, side);
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      onClick={() => onChoose(token)}
      sx={Object.assign(
        {
          cursor: 'pointer',
          ':hover': { background: theme.colors.schema.primary },
          background: selected ? theme.colors.schema.primary : '#4d4d56',
          borderRadius: '8px',
          py: 1,
          px: 2,
        },
        sx
      )}
      {...props}
    >
      <Stack alignItems="center" flexDirection="row">
        <TokenLogo token={token} />
        <Typography ml={1} variant="body2">
          {token.name}
        </Typography>
      </Stack>
      <Stack alignItems="center" flexDirection="row">
        <Typography variant="body2">{display}&nbsp;</Typography>
        <Typography color={theme.colors.functional.text.lint} variant="body2">
          {token.symbol}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Token;
