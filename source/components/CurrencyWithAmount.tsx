import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Stack, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';

import { BridgeToken, TokenType } from '../contexts/ConfigContext';
import SelectERC721Id from './SelectERC721Id';
import SelectToken from './SelectToken';
import TokenLogo from './TokenLogo';

const CurrencyWithAmount: React.FC<{
  tokens: BridgeToken[];
  selectedToken: BridgeToken | null;
  onTokenSelect: (token: BridgeToken) => void;
  onAmountOrIdChange: (value: { amount: string; valid: boolean }) => void;
  amount: string;
  side: 'l1' | 'l2';
  errorMsg?: string;
}> = ({ amount, errorMsg, onAmountOrIdChange, onTokenSelect, selectedToken, side, tokens }) => {
  const theme = useTheme();
  const [isSelectTokenOpen, setSelectTokenOpen] = React.useState(false);
  const [isSelectIdOpen, setSelectIdOpen] = React.useState(false);

  return (
    <>
      <TextField
        InputProps={{
          startAdornment: selectedToken?.type === TokenType.ERC721 && (
            <Stack
              alignItems="center"
              flexDirection="row"
              onClick={() => {
                setSelectIdOpen(true);
              }}
              sx={{
                height: '58.8px',
                color: '#111111',
                cursor: 'pointer',
              }}
            >
              <Typography
                color="#111111"
                fontSize="18px"
                fontWeight="bold"
                mr={0.5}
                variant="h4"
                whiteSpace="nowrap"
              >
                {amount || 'Select an NFT ID'}
              </Typography>
              <KeyboardArrowDownIcon
                sx={{
                  transform: isSelectTokenOpen ? 'scaleY(-1)' : 'none',
                }}
              />
            </Stack>
          ),
          endAdornment: (
            <Stack
              alignItems="center"
              flexDirection="row"
              onClick={() => {
                setSelectTokenOpen(true);
              }}
              sx={{
                pl: '8px',
                height: '58.8px',
                color: '#111111',
                cursor: 'pointer',
              }}
            >
              {selectedToken && (
                <TokenLogo sx={{ height: '28px', width: '28px' }} token={selectedToken} />
              )}
              <Typography color="#111111" fontSize="18px" ml={1} mr={0.5} whiteSpace="nowrap">
                {selectedToken?.symbol || 'Select a token'}
              </Typography>
              <KeyboardArrowDownIcon
                sx={{
                  transform: isSelectTokenOpen ? 'scaleY(-1)' : 'none',
                }}
              />
            </Stack>
          ),
        }}
        fullWidth
        onChange={e =>
          onAmountOrIdChange({ amount: e.target.value, valid: e.target.validity.valid })
        }
        placeholder={selectedToken?.type === TokenType.ERC721 ? '' : 'Enter amount'}
        sx={{
          flex: 1,
          '& div.MuiInputBase-formControl': {
            background: 'white',
          },
          '& input.MuiInputBase-input': {
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
          },
        }}
        type="number"
        // value={amount}
        value={selectedToken?.type === TokenType.ERC721 ? '' : amount}
      />
      <SelectToken
        handleClose={() => {
          setSelectTokenOpen(false);
        }}
        onTokenSelect={token => {
          onTokenSelect(token);
          // onAmountOrIdChange({ amount: '', valid: true });
        }}
        open={isSelectTokenOpen}
        selectedToken={selectedToken}
        side={side}
        tokens={tokens}
      />
      {selectedToken && (
        <SelectERC721Id
          handleClose={() => {
            setSelectIdOpen(false);
          }}
          onIdSelect={id => {
            onAmountOrIdChange({ amount: `${id}`, valid: true });
          }}
          open={isSelectIdOpen}
          selectedId={parseInt(amount)}
          side={side}
          token={selectedToken}
        />
      )}
      {errorMsg && (
        <Typography color={theme.colors.schema.failure} mt={1.25} variant="body1">
          {errorMsg}
        </Typography>
      )}
    </>
  );
};

export default CurrencyWithAmount;
