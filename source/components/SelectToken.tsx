import SearchIcon from '@mui/icons-material/Search';
import { Dialog, DialogContent, DialogTitle, Input, List } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import { BridgeToken } from '../contexts/ConfigContext';
import { useTokenBalances } from '../contexts/TokenBalanceContext';
import { useCustomSearchParams } from '../hooks/useCustomSearchParams';
import CloseButton from './CloseButton';
import Token from './Token';

const SelectToken: React.FC<{
  tokens: BridgeToken[];
  selectedToken: BridgeToken | null;
  onTokenSelect: (token: BridgeToken) => void;
  open: boolean;
  handleClose: () => void;
  side: 'l1' | 'l2';
}> = ({ handleClose, onTokenSelect, open, selectedToken, side, tokens }) => {
  const { fetchBalance } = useTokenBalances();
  const [filter, setFilter] = useState('');
  const filterdTokens = useMemo(
    () =>
      tokens.filter(
        token =>
          token.name.toLowerCase().includes(filter) ||
          token[side === 'l1' ? 'l1Address' : 'l2Address'].toLowerCase().includes(filter)
      ),
    [filter, side, tokens]
  );
  const { searchParms, setSearchParams } = useCustomSearchParams<{ token?: string }>();

  useEffect(() => {
    open && fetchBalance();
  }, [fetchBalance, open]);

  useEffect(() => {
    const token =
      tokens.find(token => token.l1Address.toLowerCase() === searchParms.token?.toLowerCase()) ||
      null;

    token && onTokenSelect(token);
  }, [onTokenSelect, searchParms, searchParms.token, tokens]);

  return (
    <Dialog open={open} sx={{ '.MuiDialog-paper': { maxWidth: '452px', width: '100%' } }}>
      <DialogTitle>
        Select a token
        <CloseButton onClose={() => handleClose()} />
      </DialogTitle>
      <DialogContent>
        <Input
          fullWidth
          onChange={e => setFilter(e.target.value)}
          placeholder="Search token by name or address"
          startAdornment={<SearchIcon sx={{ color: '#7E7E8C', mr: 1 }} />}
          sx={{
            py: '5px',
          }}
          value={filter}
        />
        <List
          sx={{
            pt: 2,
            pb: 0,
          }}
        >
          {filterdTokens.map(token => (
            <Token
              key={token.l1Address}
              onChoose={() => {
                onTokenSelect(token);
                setSearchParams(old => ({ ...old, token: token.l1Address }));
                handleClose();
              }}
              selected={token === selectedToken}
              side={side}
              sx={{
                mb: 1,
                ':last-of-type': {
                  mb: 0,
                },
              }}
              token={token}
            />
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default SelectToken;
