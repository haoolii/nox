import { Interface, Result, ethers, keccak256 } from "ethers";
import { L1BridgeAbi, L2BridgeAbi } from "./abis";
import { WithdrawData } from "./type";
import { getTimestampIsoString } from "./utils";
import { JsonRpcProvider, Log } from "@ethersproject/providers";
import { BigNumber } from "@ethersproject/bignumber";

export function getLogArgs(
    logs: Log[],
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
    
    const args = getLogArgs(receipt.logs as [], l2Iface, 'Withdraw', 'Transaction reverted');
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
    const decodedInputData = l2Iface.parseTransaction({...tx, value: tx.value.toString() });

    const functionName = decodedInputData.fragment.name as
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
  