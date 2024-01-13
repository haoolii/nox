import { Box, Stack, StackProps, Typography, useTheme } from '@mui/material';
import React from 'react';

import { BridgeToken } from '../contexts/ConfigContext';
import TokenLogo from './TokenLogo';

const NFTId: React.FC<
  {
    token: BridgeToken;
    nftId: number;
    onChoose: (id: number) => void;
    selected: boolean;
  } & StackProps
> = ({ nftId: id, onChoose, selected, sx, token, ...props }) => {
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      onClick={() => onChoose(id)}
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
        <Box ml={1}>
          <Typography>{token.symbol}</Typography>
          <Typography color={theme.colors.functional.text.lint} variant="body2">
            {token.name}
          </Typography>
        </Box>
      </Stack>
      <Typography>#{id}</Typography>
    </Stack>
  );
};

export default NFTId;
