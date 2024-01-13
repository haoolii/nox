import React from 'react';

import { Deposit } from '../../core/storage/deposit';
import { Withdraw } from '../../core/storage/withdraw';
import { DepositStatus } from '../../hooks/useDepositStatus';
import { useDepositStatusByMessage } from '../../hooks/useDepositStatusByMessage';
import useInterval from '../../hooks/useInterval';
import { useUpdator } from '../../hooks/useUpdator';
import TransferDetail from './TransferDetail';

const DepositDetail: React.FC<{
  data: Deposit & Withdraw;
  txHash: string;
  onImported: () => void;
  onBack: () => void;
}> = ({ data, onBack, onImported, txHash }) => {
  const { signal, update } = useUpdator();
  const status = useDepositStatusByMessage(data.message, signal);

  useInterval(update, 5000);

  return (
    <TransferDetail
      data={data}
      from="l1"
      onBack={onBack}
      onImported={onImported}
      status={status === DepositStatus.Unknown ? '...' : status}
      txHash={txHash}
    />
  );
};

export default DepositDetail;
