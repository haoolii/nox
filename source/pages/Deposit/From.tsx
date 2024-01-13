import { Box, Stack, Typography, useTheme } from '@mui/material';
import React, { useMemo } from 'react';

import CurrencyWithAmount from '../../components/CurrencyWithAmount';
import Network from '../../components/Network';
import { BridgeToken, useConfig } from '../../contexts/ConfigContext';
import AvailableBalance from './AvailableBalance';

const From: React.FC<{
  amountRaw: string;
  selectedToken: BridgeToken | null;
  setAmountRaw: (value: { amount: string; valid: boolean }) => void;
  setToken: (token: BridgeToken) => void;
  side: 'l1' | 'l2';
  errorMsg?: string;
}> = ({ amountRaw, errorMsg, selectedToken, setAmountRaw, setToken, side }) => {
  const theme = useTheme();
  const { l1, l2, tokens } = useConfig();
  const network = useMemo(() => (side === 'l1' ? l1 : l2), [l1, l2, side]);

  return (
    <Box
      sx={{
        py: 1.75,
      }}
    >
      <Stack alignItems="center" flexDirection="row" py={1.25}>
        <Typography color={theme.colors.functional.text.lint} marginRight={1.5} variant="body1">
          From
        </Typography>
        <Network chainId={network.id} name={network.name} />
      </Stack>
      <CurrencyWithAmount
        amount={amountRaw}
        errorMsg={errorMsg}
        onAmountOrIdChange={setAmountRaw}
        onTokenSelect={setToken}
        selectedToken={selectedToken}
        side={side}
        tokens={tokens}
      />
      {selectedToken && <AvailableBalance mt={1.25} side={side} token={selectedToken} />}
    </Box>
  );
};

export default React.memo(From);
