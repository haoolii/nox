import { Stack, Typography } from '@mui/material';
import React from 'react';

import ChainLogo from './ChainLogo';

const Network: React.FC<{ chainId: number; name: string }> = ({ chainId, name }) => {
  return (
    <Stack alignItems="center" flexDirection="row">
      <ChainLogo chainId={chainId} />
      <Typography color="white" fontWeight="bold" marginLeft={1} variant="body1">
        {name}
      </Typography>
    </Stack>
  );
};

export default Network;
