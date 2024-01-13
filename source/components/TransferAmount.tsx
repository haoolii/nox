import { Stack, StackProps, Typography, useTheme } from '@mui/material';
import { BigNumber } from 'ethers';
import React from 'react';

import { BridgeToken } from '../contexts/ConfigContext';
import { Side } from '../core/type';
import { formatDisplayUnits } from '../core/utils';
import AddToWallet from './AddToWallet';
import TokenAmount from './TokenAmount';

const TransferAmount: React.FC<
  {
    token: BridgeToken;
    amount: BigNumber;
    from: Side;
  } & StackProps
> = ({ amount, from, sx: _sx, token, ...props }) => {
  const theme = useTheme();
  const sx = Object.assign(
    {
      height: '52px',
      background: theme.colors.functional.container.dark,
      borderRadius: '4px',
    },
    _sx
  );

  return (
    <Stack
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      px={2}
      sx={sx}
      {...props}
    >
      <Typography color={theme.colors.functional.text.primary} variant="body1">
        {from === 'l1' ? 'Deposit' : 'Withdrawal'}&nbsp;{token.type === 'erc721' ? 'NFT' : 'Amount'}
      </Typography>
      <TokenAmount amount={amount} bolden from={from} token={token} />
    </Stack>
  );
};

export default TransferAmount;
