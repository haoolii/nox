import { useMemo } from 'react';

import { TokenType, useConfig } from '../contexts/ConfigContext';

function useNativeTokenConfig() {
  const { tokens } = useConfig();

  return useMemo(() => tokens.find(token => token.type === TokenType.NATIVE), [tokens]);
}

export default useNativeTokenConfig;
