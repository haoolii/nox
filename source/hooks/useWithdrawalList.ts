import { useEffect, useState } from 'react';

import { Withdraw, WITHDRAW_KEY } from '../core/storage/withdraw';

export function useWithdrawalList(signal: number): Withdraw[] {
  const [withdrawals, setWithdrawals] = useState<Withdraw[]>([]);

  useEffect(() => {
    try {
      const widthdrawls = JSON.parse(localStorage.getItem(WITHDRAW_KEY) || '[]');
      let found = false;

      // hack for backward-compatibale
      widthdrawls.forEach((withdrawal: any) => {
        if (withdrawal.hash) {
          withdrawal.withdrawalHash = withdrawal.hash;
          found = true;
        }
      });

      if (found) {
        localStorage.setItem(WITHDRAW_KEY, JSON.stringify(widthdrawls));
      }

      setWithdrawals(widthdrawls);
    } catch (e) {
      localStorage.setItem(WITHDRAW_KEY, JSON.stringify([]));
      setWithdrawals([]);
    }
  }, [signal]);

  return withdrawals;
}
