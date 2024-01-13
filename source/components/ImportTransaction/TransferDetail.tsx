import { Button, Grid, Stack, Typography } from '@mui/material';
import React, { useCallback } from 'react';

import { TokenType } from '../../contexts/ConfigContext';
import { Deposit, saveDepositToStorage } from '../../core/storage/deposit';
import { saveWithdrawToStorage, Withdraw } from '../../core/storage/withdraw';
import { timeAgo } from '../../core/timeGo';
import { Side } from '../../core/type';
import useToken from '../../hooks/useToken';
import KeyValueLine from '../KeyValueLine';
import TokenAddress from '../TokenAddress';
import TokenAmount from '../TokenAmount';
import TokenTypeDisplay from '../TokenTypeDisplay';
import TxnLink from '../TxnLink';

const TransferDetail: React.FC<{
  data: Deposit & Withdraw;
  txHash: string;
  onImported: () => void;
  onBack: () => void;
  from: Side;
  status: string;
}> = ({ data, from, onBack, onImported, status, txHash }) => {
  const token = useToken(data?.tokenL1Address);
  const importTransaction = useCallback(() => {
    if (!data) {
      return;
    }

    if (from === 'l1') {
      saveDepositToStorage(data);
    } else {
      saveWithdrawToStorage(data);
    }

    onImported();
  }, [data, from, onImported]);

  return (
    <>
      <KeyValueLine label="Transaction Type">
        <Typography>{from === 'l1' ? 'Deposit' : 'Withdrawal'}</Typography>
      </KeyValueLine>
      <KeyValueLine label="Time">
        <Typography>{timeAgo.format(new Date(data.timestamp))}</Typography>
      </KeyValueLine>
      <KeyValueLine label="Tx Hash">
        <TxnLink side={from} txnHash={txHash} />
      </KeyValueLine>
      <KeyValueLine label="Token Type">
        <TokenTypeDisplay token={token} />
      </KeyValueLine>
      <KeyValueLine label="Amount / ID">
        <TokenAmount amount={data.amountOrTokenId} token={token} />
      </KeyValueLine>
      {token?.type !== TokenType.NATIVE && (
        <KeyValueLine alignItems="flex-start" label="Token Contracts">
          <Stack alignItems="flex-end">
            <TokenAddress mb={1} side="l1" token={token} />
            <TokenAddress side="l2" token={token} />
          </Stack>
        </KeyValueLine>
      )}
      <KeyValueLine label="Status">
        <Typography>{status}</Typography>
      </KeyValueLine>

      <Grid container mt={0.5} spacing={2.5}>
        <Grid item xs={6}>
          <Button fullWidth onClick={onBack} variant="outlined">
            Back
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth onClick={importTransaction}>
            Import
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default TransferDetail;
