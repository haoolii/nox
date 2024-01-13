import { useEffect, useState } from 'react';

import { getWithdrawByTransactionHash, Withdraw } from '../core/storage/withdraw';

export function useWithdrawInLS(txnHash: string | undefined, signal?: number) {
  const [withdraw, setWithdraw] = useState<Withdraw | null>(null);

  useEffect(() => {
    if (!txnHash) {
      return;
    }

    const withdraw = getWithdrawByTransactionHash(txnHash);

    setWithdraw(withdraw ?? null);
  }, [txnHash, signal]);

  return withdraw;
}
