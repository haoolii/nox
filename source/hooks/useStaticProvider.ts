import { JsonRpcProvider } from '@ethersproject/providers';
import { useMemo } from 'react';

import { useConfig } from '../contexts/ConfigContext';

export const useStaticProvider = (side: 'l1' | 'l2') => {
  const { l1, l2 } = useConfig();

  return useMemo(
    () =>
      new JsonRpcProvider(
        side === 'l1' ? l1.rpcUrls.default.http[0] : l2.rpcUrls.default.http[0],
        side === 'l1' ? { chainId: l1.id, name: l1.name } : { chainId: l2.id, name: l2.name }
      ),
    [l1, l2, side]
  );
};
