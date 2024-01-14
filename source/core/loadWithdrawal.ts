import { ethers } from 'ethers';
import { keccak256 } from 'ethers/lib/utils.js';

// import { L1BridgeAbi, L2BridgeAbi } from '../../core/abis';
// import { Withdraw } from '../../core/storage/withdraw';
import { WithdrawData } from '../../core/type';
import { getTimestampIsoString, isTxHash } from '../../core/utils';
import { Interface, Result } from 'ethers/lib/utils.js';
import { L1BridgeAbi, L2BridgeAbi } from '../../src/core/abis';
import { JsonRpcProvider } from '@ethersproject/providers';

// import { ALERT_SEVERITY, useAlerts } from '../../contexts/AlertsContext';
// import { L1BridgeAbi, L2BridgeAbi } from '../../core/abis';
// import { Deposit } from '../../core/storage/deposit';
// import { DepositData } from '../../core/type';
// import { asyncTryCatch, getTimestampIsoString, isTxHash } from '../../core/utils';
// import useNativeTokenConfig from '../../hooks/useNativeTokenConfig';
// import { useStaticProvider } from '../../hooks/useStaticProvider';
// import useNativeTokenConfig from '../../hooks/useNativeTokenConfig';
// import { useStaticProvider } from '../../hooks/useStaticProvider';
// import { getLogArgs } from './LoadDepositButton';

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

export async function loadWithdrawal(
    provider: JsonRpcProvider,
    txHash: string,
    nativeTokenL1Address: string
  ): Promise<WithdrawData> {
    const l1Iface = new ethers.Interface(L1BridgeAbi);
    const l2Iface = new ethers.Interface(L2BridgeAbi);
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
  