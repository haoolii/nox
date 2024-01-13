import { Contract } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { BridgeToken, TokenType } from '../contexts/ConfigContext';
import { Side } from '../core/type';
import { OwnerOf } from './useBridgeTokenBalance';
import { useStaticProvider } from './useStaticProvider';

export const useTokenOwned = (
  tokenId: string,
  side: Side,
  token: BridgeToken | null
): boolean | undefined => {
  const [owned, setOwned] = useState<boolean>();
  const targetProvider = useStaticProvider(side);
  const account = useAccount();

  useEffect(() => {
    const tokenIdInt = parseInt(tokenId);

    if (
      !token ||
      token.type !== TokenType.ERC721 ||
      isNaN(tokenIdInt) ||
      !account.isConnected ||
      !account.address
    ) {
      setOwned(undefined);

      return;
    }

    const contract = new Contract(
      side === 'l1' ? token.l1Address : token.l2Address,
      [OwnerOf],
      targetProvider
    );

    contract
      .ownerOf(tokenIdInt)
      .then((owner: string) => {
        setOwned(owner === account.address);
      })
      .catch(() => {
        setOwned(false);
      });
  }, [account, account.address, account.isConnected, side, targetProvider, token, tokenId]);

  return owned;
};
