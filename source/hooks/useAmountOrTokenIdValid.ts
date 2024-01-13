import { BigNumber } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

import { BridgeToken, TokenType, useConfig } from '../contexts/ConfigContext';
import { useTokenBalance } from '../contexts/TokenBalanceContext';
import { Side } from '../core/type';
import { isNonnegativeNumber } from '../core/utils';
import { useTokenOwned } from './useTokenOwned';

function useAmountOrTokenIdValid(
  amountOrTokenId: string,
  amountBn: BigNumber,
  token: BridgeToken | null,
  side: Side,
  exactValid: boolean
) {
  const [[valid, errorMsg], setValid] = useState<[boolean | undefined, string]>([undefined, '']);
  const [balance] = useTokenBalance(token, side);
  const sufficient = useMemo(() => balance && balance.gte(amountBn), [amountBn, balance]);
  const ownedERC721 = useTokenOwned(amountOrTokenId, side, token);
  const { l1, l2 } = useConfig();
  const networkName = useMemo(() => (side === 'l1' ? l1.name : l2.name), [l1.name, l2.name, side]);

  useEffect(() => {
    if (!token) {
      setValid([undefined, '']);

      return;
    }

    if (!amountOrTokenId && exactValid) {
      setValid([false, '']);

      return;
    }

    if (!isNonnegativeNumber(amountOrTokenId)) {
      setValid([false, 'Bridging amount must be a non-negative number']);

      return;
    }

    if (token.type === TokenType.ERC20 || token.type === TokenType.NATIVE) {
      setValid([sufficient, sufficient ? '' : 'Bridging amount exceed account balance']);

      return;
    }

    if (!ownedERC721) {
      setValid([false, `You don't own ${token.symbol} #${amountOrTokenId} on ${networkName}`]);

      return;
    }

    setValid([true, '']);
  }, [amountOrTokenId, exactValid, networkName, ownedERC721, sufficient, token]);

  return useMemo(() => ({ valid, errorMsg }), [errorMsg, valid]);
}

export default useAmountOrTokenIdValid;
