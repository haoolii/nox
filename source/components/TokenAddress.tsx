import { Stack, StackProps } from '@mui/material';
import React from 'react';

import { BridgeToken, TokenType, useConfig } from '../contexts/ConfigContext';
import { Side } from '../core/type';
import AddressLink from './AddressLink';
import ChainLogo from './ChainLogo';
import NonValue from './NonValue';

const TokenAddress: React.FC<
  {
    token?: BridgeToken;
    side: Side;
  } & StackProps
> = ({ side, token, ...props }) => {
  const { l1, l2 } = useConfig();

  if (!token || token.type === TokenType.NATIVE) {
    return <NonValue />;
  }

  return (
    <Stack alignItems="center" flexDirection="row" {...props}>
      <ChainLogo
        chainId={side === 'l1' ? l1.id : l2.id}
        sx={{ width: '20px', height: '20px', mr: 1 }}
      />
      <AddressLink address={side === 'l1' ? token.l1Address : token.l2Address} side={side} />
    </Stack>
  );
};

export default TokenAddress;
