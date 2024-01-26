import { Interface, Result, ethers, keccak256 } from "ethers";
import { L1BridgeAbi, L2BridgeAbi } from "./abis";
import { DepositData } from "./type";
import { getTimestampIsoString } from "./utils";
import { JsonRpcProvider, Log } from "@ethersproject/providers";
import { getLogArgs } from "./loadWithdrawal";

export async function loadDeposit(
    provider: JsonRpcProvider,
    txHash: string,
    nativeTokenL1Address: string
  ): Promise<DepositData> {
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
    const decodedInputData = l1Iface.parseTransaction({...tx, value: tx.value.toString() });
    const functionName = decodedInputData.fragment.name as
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