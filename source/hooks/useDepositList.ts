import { useEffect, useState } from 'react';

import { Deposit, DEPOSIT_KEY } from '../core/storage/deposit';

export function useDepositList(signal: number): Deposit[] {
  const [deposits, setDeposits] = useState<Deposit[]>([]);

  useEffect(() => {
    try {
      const deposits = JSON.parse(localStorage.getItem(DEPOSIT_KEY) || '[]');

      setDeposits(deposits);
    } catch (e) {
      localStorage.setItem(DEPOSIT_KEY, JSON.stringify([]));
      setDeposits([]);
    }
  }, [signal]);

  return deposits;
}
