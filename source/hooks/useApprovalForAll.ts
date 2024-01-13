import type { TransactionResponse } from '@ethersproject/providers';

import { Contract } from '@ethersproject/contracts';
import { useCallback, useEffect, useState } from 'react';
import { useSigner } from 'wagmi';

import { ApprovalAbi } from '../core/abis';
import { useStaticProvider } from './useStaticProvider';

interface UseApprovalForAll {
  isApprovalForAll: boolean | undefined;
  getApproval: () => Promise<void>;
  setApprovalForAll: () => Promise<TransactionResponse | undefined>;
}

export const useApprovalForAll = (
  address: string,
  account: string | undefined,
  operator: string,
  approved = true
): UseApprovalForAll => {
  const [isApprovalForAll, setIsApprovalForAll] = useState<boolean>();
  const signer = useSigner();
  const provider = useStaticProvider('l1');

  const getApproval = useCallback(async () => {
    const contract = new Contract(address, ApprovalAbi, provider);

    if (contract) {
      await contract
        .isApprovedForAll(account, operator)
        .then((value: boolean) => {
          setIsApprovalForAll(value);
        })
        .catch((e: any) => {
          console.debug(e);
          setIsApprovalForAll(undefined);
        });
    }
  }, [account, address, operator, provider]);

  useEffect(() => {
    getApproval();
  }, [getApproval]);

  const setApprovalForAll = async () => {
    if (!signer.data || !signer.isSuccess) {
      return;
    }

    const contract = new Contract(address, ApprovalAbi, signer.data);

    if (!contract) return;

    const transaction: TransactionResponse = await contract.setApprovalForAll(operator, approved);

    await transaction.wait();
    await getApproval();

    return transaction;
  };

  return {
    isApprovalForAll,
    getApproval,
    setApprovalForAll,
  };
};
