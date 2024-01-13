import { BigNumber, Contract } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import { BridgeToken, TokenType } from '../contexts/ConfigContext';
import useInterval from './useInterval';
import { useStaticProvider } from './useStaticProvider';

export const DEFAULT_BAL = BigNumber.from(0);
export const OwnerOf = {
  inputs: [
    {
      internalType: 'uint256',
      name: 'tokenId',
      type: 'uint256',
    },
  ],
  name: 'ownerOf',
  outputs: [
    {
      internalType: 'address',
      name: '',
      type: 'address',
    },
  ],
  stateMutability: 'view',
  type: 'function',
};
export const ERC20BalanceOf = {
  inputs: [
    {
      internalType: 'address',
      name: 'account',
      type: 'address',
    },
  ],
  name: 'balanceOf',
  outputs: [
    {
      internalType: 'uint256',
      name: '',
      type: 'uint256',
    },
  ],
  stateMutability: 'view',
  type: 'function',
};

export const useBridgeTokenBalance = (
  account: string | undefined,
  token: BridgeToken,
  side: 'l1' | 'l2',
  tokenId?: number
) => {
  const [balance, setBalance] = useState<BigNumber>(DEFAULT_BAL);
  const targetProvider = useStaticProvider(side);

  const getBalance = useCallback(() => {
    if (!account) {
      return;
    }

    if (token.type === TokenType.NATIVE) {
      targetProvider
        .getBalance(account)
        .then(setBalance)
        .catch(err => {
          setBalance(BigNumber.from(0));
          console.error('Native getBalance error', err);
        });
    } else if (token.type === TokenType.ERC20) {
      const contract = new Contract(
        side === 'l1' ? token.l1Address : token.l2Address,
        [ERC20BalanceOf],
        targetProvider
      );

      contract
        .balanceOf(account)
        .then(setBalance)
        .catch((err: any) => {
          console.error('ERC20 balanceOf error', err);
        });
    } else if (token.type === TokenType.ERC721) {
      if (tokenId === undefined || isNaN(tokenId)) {
        return;
      }

      const contract = new Contract(
        side === 'l1' ? token.l1Address : token.l2Address,
        [OwnerOf],
        targetProvider
      );

      contract
        .ownerOf(tokenId)
        .then((owner: string) => {
          setBalance(BigNumber.from(owner === account ? 1 : 0));
        })
        .catch(() => {
          setBalance(BigNumber.from(0));
        });
    }
  }, [account, side, targetProvider, token.l1Address, token.l2Address, token.type, tokenId]);

  useEffect(() => {
    setBalance(BigNumber.from(0));
    getBalance();
  }, [getBalance, token]);

  useInterval(getBalance, 15 * 1000);

  return balance;
};
