import { LoadingButton } from '@mui/lab';
import { ethers } from 'ethers';
import { keccak256 } from 'ethers/lib/utils.js';
import React from 'react';
import { useMutation } from 'react-query';

import { ALERT_SEVERITY, useAlerts } from '../../contexts/AlertsContext';
import { L1BridgeAbi, L2BridgeAbi } from '../../core/abis';
import { Withdraw } from '../../core/storage/withdraw';
import { WithdrawData } from '../../core/type';
import { getTimestampIsoString, isTxHash } from '../../core/utils';
import useNativeTokenConfig from '../../hooks/useNativeTokenConfig';
import { useStaticProvider } from '../../hooks/useStaticProvider';
import { getLogArgs } from './LoadDepositButton';

const LoadWithdrawalButton: React.FC<{
  txHash: string;
  setWithdrawal: (withdrawal: Withdraw) => void;
}> = ({ setWithdrawal, txHash }) => {
  const { alert } = useAlerts();
  const l2Provider = useStaticProvider('l2');
  const nativeToken = useNativeTokenConfig();
  const { isLoading, mutate: query } = useMutation<any, any, string>({
    mutationFn: async (txHash: string) => {
      if (!nativeToken) {
        return;
      }

      const withdrawal = await loadWithdrawal(l2Provider, txHash, nativeToken.l1Address);

      setWithdrawal(withdrawal);
    },
    onError(e) {
      console.error(e);
      alert({
        title: 'Search failed',
        desc: e.message,
        severity: ALERT_SEVERITY.ERROR,
      });
    },
  });

  return (
    <LoadingButton
      disabled={!isTxHash(txHash)}
      fullWidth
      loading={isLoading}
      onClick={() => query(txHash)}
      variant="contained"
    >
      Search
    </LoadingButton>
  );
};

export default LoadWithdrawalButton;

export async function loadWithdrawal(
  provider: ethers.providers.JsonRpcProvider,
  txHash: string,
  nativeTokenL1Address: string
): Promise<WithdrawData> {
  const l1Iface = new ethers.utils.Interface(L1BridgeAbi);
  const l2Iface = new ethers.utils.Interface(L2BridgeAbi);
  const [receipt, tx] = await Promise.all([
    provider.getTransactionReceipt(txHash),
    provider.getTransaction(txHash),
  ]);

  if (!tx || !receipt) {
    throw new Error("This transaction hasn't been minted, please check transaction hash");
  }

  const block = await provider.getBlock(receipt.blockNumber);
  const args = getLogArgs(receipt.logs, l2Iface, 'Withdraw', 'Transaction reverted');
  const withdrawal: WithdrawData = {
    message: args.message,
    blockNumber: receipt.blockNumber,
    withdrawalHash: keccak256(args.message),
    transactionHash: txHash,
    from: receipt.from,
    timestamp: getTimestampIsoString(block.timestamp),
    amountOrTokenId: '',
    tokenL1Address: '',
  };
  const decodedInputData = l2Iface.parseTransaction(tx);
  const functionName = decodedInputData.functionFragment.name as
    | 'withdrawNative'
    | 'withdrawERC20'
    | 'withdrawERC721';

  if (functionName === 'withdrawNative') {
    const fragment = l1Iface.getFunction('finalizeWithdrawNative');
    const [, , amount] = l1Iface.decodeFunctionData(fragment, args.message);

    withdrawal.amountOrTokenId = amount.toString();
    withdrawal.tokenL1Address = nativeTokenL1Address;
  } else if (functionName === 'withdrawERC20') {
    const fragment = l1Iface.getFunction('finalizeWithdrawERC20');
    const [, l1Token, , amount] = l1Iface.decodeFunctionData(fragment, args.message);

    withdrawal.amountOrTokenId = amount.toString();
    withdrawal.tokenL1Address = l1Token;
  } else {
    const fragment = l1Iface.getFunction('finalizeWithdrawERC721');
    const [, l1Token, , tokenId] = l1Iface.decodeFunctionData(fragment, args.message);

    withdrawal.amountOrTokenId = tokenId.toString();
    withdrawal.tokenL1Address = l1Token;
  }

  return withdrawal;
}
