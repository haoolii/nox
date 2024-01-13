import type { TransactionResponse } from '@ethersproject/providers';

import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSigner } from 'wagmi';

import ERC20 from '../core/abis/ERC20.json';
import { callMethod } from '../core/utils';
import { useStaticProvider } from './useStaticProvider';
import { useUpdator } from './useUpdator';

interface UseApprove {
  allowance: BigNumber;
  isApproved: boolean;
  approve: () => Promise<TransactionResponse | undefined>;
}

export const useApprove = (
  address: string,
  owner: string | undefined,
  spender: string,
  amount: BigNumber,
  side: 'l1' | 'l2'
): UseApprove => {
  const signer = useSigner();
  const [allowance, setAllowance] = useState<BigNumber>(BigNumber.from('0'));
  const { signal, update } = useUpdator();
  const isApproved = useMemo(() => allowance.gte(amount), [allowance, amount]);
  const provider = useStaticProvider(side);

  useEffect(() => {
    if (!owner) {
      return;
    }

    const contract = new Contract(address, ERC20, provider);

    contract
      .allowance(owner, spender)
      .then((_allowance: BigNumber) => {
        setAllowance(_allowance);
      })
      .catch(console.debug);
  }, [address, owner, provider, signer.data, signer.isSuccess, spender, signal]);

  const approve = useCallback(async () => {
    if (!owner || !signer.data || !signer.isSuccess) {
      return;
    }

    const contract = new Contract(address, ERC20, signer.data);
    const transaction: TransactionResponse = await callMethod(contract, 'approve', [
      spender,
      amount,
    ]);

    await transaction.wait();

    update();

    return transaction;
  }, [owner, signer.data, signer.isSuccess, address, spender, amount, update]);

  return {
    allowance,
    isApproved,
    approve,
  };
};
