import React, { useCallback } from 'react';
import { useAccount, useChainId, useSwitchNetwork } from 'wagmi';

import { BridgeToken, TokenType, useConfig } from '../contexts/ConfigContext';
import { Side } from '../core/type';
import IconMetamask from './icons/IconMetamask';

const AddToWallet: React.FC<{ token: BridgeToken; from: Side }> = ({ from, token }) => {
  const currentChainId = useChainId();
  const { l1, l2 } = useConfig();
  const { switchNetworkAsync } = useSwitchNetwork();
  const account = useAccount();

  const addToWallet = useCallback(async () => {
    if (!window.ethereum || !account.isConnected || !account.address) {
      return;
    }

    if (from === 'l1' && currentChainId !== l2.id) {
      await switchNetworkAsync?.(l2.id);
    } else if (from === 'l2' && currentChainId !== l1.id) {
      await switchNetworkAsync?.(l1.id);
    }

    if (token.type === TokenType.ERC20) {
      window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: from === 'l1' ? token.l2Address : token.l1Address,
            symbol: token.symbol,
            decimals: token.decimals,
          },
        },
      });
    }
  }, [
    account.address,
    account.isConnected,
    currentChainId,
    from,
    l1.id,
    l2.id,
    switchNetworkAsync,
    token.decimals,
    token.l1Address,
    token.l2Address,
    token.symbol,
    token.type,
  ]);

  if (
    token.type !== TokenType.ERC20 ||
    !window.ethereum ||
    !account.isConnected ||
    !account.address ||
    !switchNetworkAsync
  ) {
    return <></>;
  }

  return (
    <IconMetamask
      onClick={addToWallet}
      sx={{
        height: '24px',
        width: '24px',
        marginLeft: 2,
        cursor: 'pointer',
        '&:hover': {
          rect: {
            fill: '#DDDDE3',
          },
        },
      }}
    />
  );
};

export default AddToWallet;
