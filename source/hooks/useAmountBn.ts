import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';
import { useMemo } from 'react';

import { BridgeToken } from '../contexts/ConfigContext';
import { isNonnegativeNumber, toFixed } from '../core/utils';

function useAmountBN(amountRaw: string, selectedToken: BridgeToken | null) {
  return useMemo(() => {
    if (!selectedToken) {
      return BigNumber.from(0);
    }

    if (!isNonnegativeNumber(amountRaw)) {
      return BigNumber.from(0);
    }

    const decimals = selectedToken.decimals;

    return parseUnits(toFixed(amountRaw, decimals), decimals);
  }, [amountRaw, selectedToken]);
}

export default useAmountBN;
