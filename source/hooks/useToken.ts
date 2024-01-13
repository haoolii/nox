import { useMemo } from 'react';

import { useConfig } from '../contexts/ConfigContext';

function useToken(l1Address?: string) {
  const { tokens } = useConfig();

  return useMemo(() => tokens.find(token => token.l1Address === l1Address), [l1Address, tokens]);
}

export default useToken;
