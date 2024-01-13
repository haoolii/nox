import { LoadingButton } from '@mui/lab';
import { ethers } from 'ethers';
import { Interface, keccak256, Result } from 'ethers/lib/utils.js';
import React from 'react';
import { useMutation } from 'react-query';

import { ALERT_SEVERITY, useAlerts } from '../../contexts/AlertsContext';
import { L1BridgeAbi, L2BridgeAbi } from '../../core/abis';
import { Deposit } from '../../core/storage/deposit';
import { DepositData } from '../../core/type';
import { asyncTryCatch, getTimestampIsoString, isTxHash } from '../../core/utils';
import useNativeTokenConfig from '../../hooks/useNativeTokenConfig';
import { useStaticProvider } from '../../hooks/useStaticProvider';

const LoadDepositButton: React.FC<{
  txHash: string;
  setDeposit: (deposit: Deposit) => void;
}> = ({ setDeposit, txHash }) => {
  const { alert } = useAlerts();
  const l1Provider = useStaticProvider('l1');
  const nativeToken = useNativeTokenConfig();
  const { isLoading, mutate: query } = useMutation<any, any, string>({
    mutationFn: async (txHash: string) => {
      if (!nativeToken) {
        return;
      }

      const [error, deposit] = await asyncTryCatch(
        loadDeposit,
        l1Provider,
        txHash,
        nativeToken.l1Address
      );

      if (error) {
        throw error;
      }

      setDeposit(deposit);
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

export default LoadDepositButton;

export function getLogArgs(
  logs: ethers.providers.Log[],
  iface: Interface,
  name: string,
  error?: string
): Result {
  const log = logs
    .map(log => {
      try {
        return iface.parseLog(log);
      } catch (e) {
        return undefined;
      }
    })
    .find(log => log?.name === name);

  if (!log) {
    throw new Error(error || `No related ${name} event`);
  }

  return log.args;
}

export async function loadDeposit(
  provider: ethers.providers.JsonRpcProvider,
  txHash: string,
  nativeTokenL1Address: string
): Promise<DepositData> {
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
  const args = getLogArgs(receipt.logs, l1Iface, 'Deposit', 'Transaction reverted');
  const deposit: DepositData = {
    message: args.message,
    blockNumber: receipt.blockNumber,
    depositHash: keccak256(args.message),
    transactionHash: txHash,
    from: receipt.from,
    timestamp: getTimestampIsoString(block.timestamp || 0),
    amountOrTokenId: '',
    tokenL1Address: '',
  };
  const decodedInputData = l1Iface.parseTransaction(tx);
  const functionName = decodedInputData.functionFragment.name as
    | 'depositNative'
    | 'depositERC20'
    | 'depositERC721';

  if (functionName === 'depositNative') {
    deposit.amountOrTokenId = tx.value.toString();
    deposit.tokenL1Address = nativeTokenL1Address;
  } else if (functionName === 'depositERC20') {
    const fragment = l2Iface.getFunction('finalizeDepositERC20');
    const { amount, l1Token } = l2Iface.decodeFunctionData(fragment, args.message);

    deposit.amountOrTokenId = amount.toString();
    deposit.tokenL1Address = l1Token;
  } else {
    const fragment = l2Iface.getFunction('finalizeDepositERC721');
    const { l1Token, tokenId } = l2Iface.decodeFunctionData(fragment, args.message);

    deposit.amountOrTokenId = tokenId.toString();
    deposit.tokenL1Address = l1Token;
  }

  return deposit;
}
