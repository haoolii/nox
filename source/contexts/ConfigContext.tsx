import { createContext, useContext, useState } from 'react';
import { Chain } from 'wagmi';

import { Address } from '../core/type';

export interface NetWorkConfig extends Chain {
  bridgeAddress: string;
  erc721GraphQlUrl: string;
}

export enum TokenType {
  ERC20 = 'erc20',
  ERC721 = 'erc721',
  NATIVE = 'native',
}

export type BridgeToken = {
  l1Address: Address;
  l2Address: Address;
  name: string;
  symbol: string;
  decimals: number;
  type: TokenType;
};

interface Context {
  l1: NetWorkConfig;
  l2: NetWorkConfig;
  tokens: BridgeToken[];
}

export const ConfigContext = createContext<Context>({} as Context);

export const useConfig = () => {
  return useContext(ConfigContext);
};

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // TODO: Expose and implement 2nd setState tuple setNetwork (Otherwise there is no need for React Context)
  const [{ l1, l2 }] = useState<{ l1: NetWorkConfig | null; l2: NetWorkConfig | null }>({
    l1: window.appConfig.bridge.l1,
    l2: window.appConfig.bridge.l2,
  });
  // TODO: Expose and implement 2nd setState tuple setTokens (Otherwise there is no need for React Context)
  const [tokens] = useState<BridgeToken[]>(window.appConfig.bridge.tokens);

  if (!l1 || !l2) {
    return null;
  }

  return <ConfigContext.Provider value={{ l1, l2, tokens }}>{children}</ConfigContext.Provider>;
};
