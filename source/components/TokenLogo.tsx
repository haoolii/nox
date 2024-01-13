import { Box, SxProps } from '@mui/material';
import React from 'react';

import { BridgeToken, TokenType } from '../contexts/ConfigContext';
import IconEth from './icons/chains/IconEth';
import IconERC20Token from './icons/tokens/IconERC20';
import IconERC721Token from './icons/tokens/IconERC721';

type TokenL1Address = string;
const tokenLogoMap: Record<TokenL1Address, string> = {};

// todo move it to `appConfig`
function getTokenLogoSrc(tokenL1Address: string): string | undefined {
  return tokenLogoMap[tokenL1Address];
}

const TokenLogo: React.FC<{
  token: BridgeToken;
  sx?: SxProps;
}> = ({ sx: _sx, token }) => {
  const logoSrc = getTokenLogoSrc(token.l1Address);
  const sx = Object.assign({ height: '32px', width: '32px' }, _sx);

  if (logoSrc) {
    <Box component="img" src={logoSrc} sx={sx} />;
  }

  if (token.type === TokenType.ERC20) {
    return <IconERC20Token sx={sx} />;
  }

  if (token.type === TokenType.ERC721) {
    return <IconERC721Token sx={sx} />;
  }

  return <IconEth sx={sx} />;
};

export default TokenLogo;
