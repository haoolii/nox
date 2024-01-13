import { BigNumber, Contract } from 'ethers';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

import { Address, Side } from '../core/type';
import { formatDisplayUnits } from '../core/utils';
import { ERC20BalanceOf } from '../hooks/useBridgeTokenBalance';
import { useStaticProvider } from '../hooks/useStaticProvider';
import { BridgeToken, TokenType, useConfig } from './ConfigContext';

export type TokenKey = `l1${Address}` | `l2${string}`;

interface Context {
  tokenBalances: Record<TokenKey, BigNumber>;
  fetchBalance: () => Promise<void>;
}

export const TokenBalanceContext = createContext<Context>({} as Context);

export const useTokenBalances = () => {
  return useContext(TokenBalanceContext);
};

export const TokenBalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const account = useAccount();
  const { tokens } = useConfig();
  const l1Provider = useStaticProvider('l1');
  const l2Provider = useStaticProvider('l2');
  const [tokenBalances, setTokenBalances] = useState<Record<string, BigNumber>>({});

  const fetchBalance = useCallback(async () => {
    if (!account.isConnected || !account.address) {
      return;
    }

    const balances = await Promise.all(
      tokens.map(async token => {
        const address = account.address as string;

        if (token.type === TokenType.NATIVE) {
          const [l1Result, l2Result] = await Promise.allSettled([
            l1Provider.getBalance(address),
            l2Provider.getBalance(address),
          ]);

          return {
            l1: l1Result.status === 'fulfilled' ? l1Result.value : BigNumber.from(0),
            l2: l2Result.status === 'fulfilled' ? l2Result.value : BigNumber.from(0),
          };
        }

        const l1Contract = new Contract(token.l1Address, [ERC20BalanceOf], l1Provider);
        const l2Contract = new Contract(token.l2Address, [ERC20BalanceOf], l2Provider);
        const [l1Result, l2Result] = await Promise.allSettled([
          l1Contract.balanceOf(address),
          l2Contract.balanceOf(address),
        ]);

        return {
          l1: l1Result.status === 'fulfilled' ? l1Result.value : BigNumber.from(0),
          l2: l2Result.status === 'fulfilled' ? l2Result.value : BigNumber.from(0),
        };
      })
    );
    const tokenBalances = balances.reduce((all: Record<TokenKey, BigNumber>, curr, index) => {
      all[`l1${tokens[index].l1Address}`] = curr.l1;
      all[`l2${tokens[index].l2Address}`] = curr.l2;

      return all;
    }, {} as Record<TokenKey, BigNumber>);

    setTokenBalances(tokenBalances);
  }, [account.address, account.isConnected, l1Provider, l2Provider, tokens]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return (
    <TokenBalanceContext.Provider value={{ tokenBalances, fetchBalance }}>
      {children}
    </TokenBalanceContext.Provider>
  );
};

export const useTokenBalance = (
  token: BridgeToken | null,
  side: Side
): [BigNumber | undefined, string] => {
  const { tokenBalances } = useTokenBalances();
  const balance = token
    ? tokenBalances[`${side}${side === 'l1' ? token.l1Address : token.l2Address}`]
    : undefined;

  return useMemo(
    () => [balance, balance && token ? formatDisplayUnits(balance, token.decimals, 3) : '0'],
    [balance, token]
  );
};
