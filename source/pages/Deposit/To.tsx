import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';

import Network from '../../components/Network';
import { BridgeToken, useConfig } from '../../contexts/ConfigContext';
import L2Balance from './L2Balance';

const To: React.FC<{ selectedToken: BridgeToken | null; side: 'l1' | 'l2' }> = ({
  selectedToken,
  side,
}) => {
  const theme = useTheme();
  const { l1, l2 } = useConfig();
  const network = useMemo(() => (side === 'l1' ? l1 : l2), [l1, l2, side]);

  return (
    <Box pb={4}>
      <Stack alignItems="center" flexDirection="row" py={1.5}>
        <Typography color={theme.colors.functional.text.lint} marginRight={1.5} variant="body1">
          To
        </Typography>
        <Network chainId={network.id} name={network.name} />
      </Stack>
      {selectedToken && <L2Balance side={side} token={selectedToken} />}
    </Box>
  );
};

export default To;
