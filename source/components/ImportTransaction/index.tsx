import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  Radio,
  Stack,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';

import { Deposit } from '../../core/storage/deposit';
import { Withdraw } from '../../core/storage/withdraw';
import { TxType } from '../../core/type';
import CloseButton from '../CloseButton';
import KeyValueLine from '../KeyValueLine';
import DepositDetail from './DepositDetail';
import LoadDepositButton from './LoadDepositButton';
import LoadWithdrawalButton from './LoadWithdrawalButton';
import WithdrawalDetail from './WithdrawalDetail';

const Content: React.FC<{
  deposit: Deposit | null;
  withdraw: Withdraw | null;
  txHash: string;
  txType: TxType;
  setDeposit: (deposit: Deposit | null) => void;
  setWithdrawal: (withdrawal: Withdraw | null) => void;
  setTransactionHash: (hash: string) => void;
  onImported: () => void;
}> = ({
  deposit,
  onImported,
  setDeposit,
  setTransactionHash,
  setWithdrawal,
  txHash,
  txType,
  withdraw,
}) => {
  if (!deposit && !withdraw) {
    return txType === TxType.DEPOSIT ? (
      <LoadDepositButton setDeposit={setDeposit} txHash={txHash} />
    ) : (
      <LoadWithdrawalButton setWithdrawal={setWithdrawal} txHash={txHash} />
    );
  }

  if (txType === TxType.DEPOSIT) {
    return (
      deposit && (
        <DepositDetail
          data={deposit}
          onBack={() => {
            setDeposit(null);
            setTransactionHash('');
          }}
          onImported={onImported}
          txHash={txHash}
        />
      )
    );
  }

  return (
    withdraw && (
      <WithdrawalDetail
        data={withdraw}
        onBack={() => {
          setWithdrawal(null);
          setTransactionHash('');
        }}
        onImported={onImported}
        txHash={txHash}
      />
    )
  );
};

const ImportTransaction: React.FC<{
  onImported: () => void;
}> = ({ onImported }) => {
  const [isImportOpen, setImportOpen] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [txType, setTxType] = useState<TxType>(TxType.DEPOSIT);
  const [depositData, setDepositData] = useState<Deposit | null>(null);
  const [withdrawalData, setWithdrawalData] = useState<Withdraw | null>(null);
  const onTypeChange = useCallback((type: TxType) => {
    setTxType(type);
  }, []);

  return (
    <>
      <Button onClick={() => setImportOpen(true)} sx={{ width: '190px' }} variant="contained">
        Import Transaction
      </Button>
      <Dialog open={isImportOpen} sx={{ '.MuiDialog-paper': { maxWidth: '452px', width: '100%' } }}>
        <DialogTitle>
          Import transaction
          <CloseButton
            onClose={() => {
              setTxHash('');
              setTxType(TxType.DEPOSIT);
              setDepositData(null);
              setWithdrawalData(null);
              setImportOpen(false);
              onImported();
            }}
          />
        </DialogTitle>
        <DialogContent>
          {!depositData && !withdrawalData && (
            <>
              <KeyValueLine label="Select transaction type" mb={2}>
                <Stack alignItems="center" flexDirection="row">
                  <Stack alignItems="center" flexDirection="row" mr={2}>
                    <Radio
                      checked={txType === TxType.DEPOSIT}
                      onChange={e => onTypeChange(e.target.value as TxType)}
                      value={TxType.DEPOSIT}
                    />
                    <Typography>Deposit</Typography>
                  </Stack>
                  <Stack alignItems="center" flexDirection="row">
                    <Radio
                      checked={txType === TxType.WITHDRAWAL}
                      onChange={e => onTypeChange(e.target.value as TxType)}
                      value={TxType.WITHDRAWAL}
                    />
                    <Typography>Withdrawal</Typography>
                  </Stack>
                </Stack>
              </KeyValueLine>
              <Input
                fullWidth
                onChange={e => setTxHash(e.target.value)}
                placeholder="Enter transaction hash"
                startAdornment={<SearchIcon sx={{ color: '#7E7E8C', mr: 1 }} />}
                sx={{
                  py: '5px',
                  mb: 4,
                }}
                value={txHash}
              />
            </>
          )}
          <Content
            deposit={depositData}
            onImported={() => {
              setTxHash('');
              setTxType(TxType.DEPOSIT);
              setDepositData(null);
              setWithdrawalData(null);
              onImported();
            }}
            setDeposit={setDepositData}
            setTransactionHash={setTxHash}
            setWithdrawal={setWithdrawalData}
            txHash={txHash}
            txType={txType}
            withdraw={withdrawalData}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImportTransaction;
