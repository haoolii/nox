import { Stack, StackProps, Typography } from '@mui/material';
import React from 'react';

import { BridgeToken } from '../contexts/ConfigContext';
import TokenLogo from './TokenLogo';

const TokenTypeDisplay: React.FC<
  {
    token?: BridgeToken;
  } & StackProps
> = ({ token, ...props }) => {
  return (
    <Stack alignItems="center" flexDirection="row" {...props}>
      {token && <TokenLogo sx={{ mr: 1, width: 20, height: 20 }} token={token} />}
      <Typography textTransform="uppercase">{token?.type}</Typography>
    </Stack>
  );
};

export default TokenTypeDisplay;
