import { SxProps } from '@mui/material';
import React from 'react';

import IconAltLayer from './icons/chains/IconAltLayer';
import IconEth from './icons/chains/IconEth';

const ChainLogo: React.FC<{ chainId: number; sx?: SxProps }> = ({ chainId, sx }) => {
  switch (chainId) {
    case 9997:
      return <IconAltLayer sx={sx} />;
    default:
      return <IconEth sx={sx} />;
  }
};

export default ChainLogo;
