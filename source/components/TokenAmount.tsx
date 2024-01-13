import { Stack, StackProps, Typography, useTheme } from '@mui/material';
import { BigNumberish } from 'ethers';
import React from 'react';

import { BridgeToken } from '../contexts/ConfigContext';
import { Side } from '../core/type';
import { formatDisplayUnits } from '../core/utils';
import AddToWallet from './AddToWallet';

const TokenAmount: React.FC<
  {
    token?: BridgeToken;
    amount: BigNumberish;
    from?: Side;
    bolden?: boolean;
  } & StackProps
> = ({ amount, bolden = false, from, token, ...props }) => {
  const theme = useTheme();

  if (!token) {
    return <></>;
  }

  const display = formatDisplayUnits(amount, token.decimals, 3);

  if (token.type === 'erc721') {
    return (
      <Stack alignItems="center" flexDirection="row" {...props}>
        <Typography color={theme.colors.functional.text.lint} variant="body1">
          {token.symbol.toLocaleUpperCase()}&nbsp;
        </Typography>
        <Typography fontWeight={bolden ? 'bold' : 'normal'} variant="body1">
          #{display}
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack alignItems="center" flexDirection="row">
      <Typography fontWeight={bolden ? 'bold' : 'normal'} variant="body1">
        {display}
      </Typography>
      <Typography color={theme.colors.functional.text.lint} variant="body1">
        &nbsp;{token.symbol.toLocaleUpperCase()}
      </Typography>
      {from && <AddToWallet from={from} token={token} />}
    </Stack>
  );
};

export default TokenAmount;
