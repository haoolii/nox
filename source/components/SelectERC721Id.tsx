import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  List,
  Stack,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

import { BridgeToken, useConfig } from '../contexts/ConfigContext';
import { Side } from '../core/type';
import CloseButton from './CloseButton';
import NFTId from './NFTId';

interface Data {
  data: {
    owner: null | {
      id: string;
      ownedTokens: {
        id: string;
      }[];
    };
  };
}

const SelectERC721Id: React.FC<{
  token: BridgeToken;
  selectedId: number | undefined;
  onIdSelect: (id: number) => void;
  open: boolean;
  handleClose: () => void;
  side: Side;
}> = ({ handleClose, onIdSelect, open, selectedId, side, token }) => {
  const { l1, l2 } = useConfig();
  const [ids, setIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(
    typeof selectedId === 'number' && !isNaN(selectedId) ? `${selectedId}` : ''
  );
  const filterdIds: number[] = useMemo(
    () => ids.filter(id => `${id}`.includes(filter)),
    [filter, ids]
  );
  const account = useAccount();

  useEffect(() => {
    if (!account.address || !open) {
      return;
    }

    setLoading(true);
    fetch(side === 'l1' ? l1.erc721GraphQlUrl : l2.erc721GraphQlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `
          query MyQuery {
            owner(id: "${account.address.toLowerCase()}") {
              id
              ownedTokens {
                id
              }
            }
          }
      `,
      }),
    })
      .then(r => r.json())
      .then((data: Data) => {
        setIds(data.data.owner?.ownedTokens.map(token => parseInt(token.id)) ?? []);
      })
      .catch(() => setIds([]))
      .finally(() => setLoading(false));
  }, [account.address, l1.erc721GraphQlUrl, l2.erc721GraphQlUrl, open, side]);

  return (
    <Dialog open={open} sx={{ '.MuiDialog-paper': { maxWidth: '452px', width: '100%' } }}>
      <DialogTitle>
        Select NFT ID
        <CloseButton onClose={() => handleClose()} />
      </DialogTitle>
      <DialogContent>
        <Input
          fullWidth
          onChange={e => setFilter(e.target.value)}
          placeholder="Enter NFT ID"
          startAdornment={<SearchIcon sx={{ color: '#7E7E8C', mr: 1 }} />}
          sx={{
            py: '5px',
          }}
          type="number"
          value={filter}
        />
        {loading ? (
          <Stack flexDirection="row" justifyContent="center" py={5}>
            <CircularProgress />
          </Stack>
        ) : (
          <List
            sx={{
              pt: 2,
              pb: 0,
            }}
          >
            {filterdIds.map(id => (
              <NFTId
                key={id}
                nftId={id}
                onChoose={() => {
                  onIdSelect(id);
                  handleClose();
                  setFilter('');
                }}
                selected={id === selectedId}
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
        )}
        <Button
          disabled={!filter || `${parseInt(filter)}` !== filter}
          fullWidth
          onClick={() => {
            onIdSelect(parseInt(filter));
            handleClose();
            setFilter('');
          }}
          sx={{ mt: 2 }}
        >
          {!filter || `${parseInt(filter)}` !== filter
            ? 'Please select or input a NFT ID'
            : `Select #${filter}`}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SelectERC721Id;
