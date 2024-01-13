import { useEffect, useState } from 'react';

import { Deposit, getDepositByTransactionHash } from '../core/storage/deposit';

function useDeposit(transactionHash: string | undefined) {
  const [deposit, setDeposit] = useState<Deposit>();

  useEffect(() => {
    if (!transactionHash) {
      return;
    }

    const deposit = getDepositByTransactionHash(transactionHash);

    setDeposit(deposit);
  }, [transactionHash]);

  return deposit;
}

export default useDeposit;
