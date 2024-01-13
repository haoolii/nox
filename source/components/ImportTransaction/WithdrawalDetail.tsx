import React from 'react';

import { Deposit } from '../../core/storage/deposit';
import { Withdraw } from '../../core/storage/withdraw';
import { useWithdrawStatus, WithdrawStatus } from '../../hooks/useWithdrawStatus';
import TransferDetail from './TransferDetail';

const WithdrawalDetail: React.FC<{
  data: Deposit & Withdraw;
  txHash: string;
  onImported: () => void;
  onBack: () => void;
}> = ({ data, onBack, onImported, txHash }) => {
  const { blocksUntilWithdrawable, withdrawalStatus } = useWithdrawStatus(data.transactionHash);
  let statusText = '';

  switch (withdrawalStatus) {
    case WithdrawStatus.Initiated:
      statusText = 'Waiting for verifier to post transaction commitment';
      break;
    case WithdrawStatus.Committed:
      statusText = `Waiting for challenge period: ${blocksUntilWithdrawable} blocks remaining`;
      break;
    case WithdrawStatus.Withdrawable:
      statusText = 'Ready to withdraw';
      break;
    case WithdrawStatus.Withdrawed:
      statusText = 'Completed';
      break;
    case WithdrawStatus.Unknown:
      statusText = '...';
  }

  return (
    <TransferDetail
      data={data}
      from="l2"
      onBack={onBack}
      onImported={onImported}
      status={statusText}
      txHash={txHash}
    />
  );
};

export default WithdrawalDetail;
