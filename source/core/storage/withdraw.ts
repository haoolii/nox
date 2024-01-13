import { TransactionReceipt } from '@ethersproject/providers';
import { BigNumberish, ethers } from 'ethers';
import { keccak256 } from 'ethers/lib/utils.js';

import { L2BridgeAbi } from '../abis';
import { WithdrawData } from '../type';

export const WITHDRAW_KEY = 'withdraw-list';

export interface Withdraw {
  blockNumber?: number;
  message?: string;
  withdrawalHash?: string;
  transactionHash: string;
  from: string;
  amountOrTokenId: string;
  // for indexing token
  tokenL1Address: string;
  timestamp: string;
}

interface IAddWithdraw {
  txReceipt: TransactionReceipt;
  amountOrTokenId: BigNumberish;
  tokenL1Address: string;
  account: string;
  transactionHash: string;
}

export function saveWithdrawToStorage(withdraw: Withdraw) {
  const data = localStorage.getItem(WITHDRAW_KEY);
  let withdrawList: Withdraw[] = [];

  try {
    withdrawList = data ? JSON.parse(data) : [];
  } catch (e) {
    console.debug(e);
  }

  const existingIndex = withdrawList.findIndex(
    _withdraw =>
      (_withdraw.withdrawalHash &&
        withdraw.withdrawalHash &&
        _withdraw.withdrawalHash === withdraw.withdrawalHash) ||
      (_withdraw.transactionHash &&
        withdraw.transactionHash &&
        _withdraw.transactionHash === withdraw.transactionHash)
  );

  if (existingIndex < 0) {
    withdrawList.push(withdraw);
  } else {
    withdrawList.splice(existingIndex, 1, withdraw);
  }

  localStorage.setItem(WITHDRAW_KEY, JSON.stringify(withdrawList));
}

export function addWithdraw({
  account,
  amountOrTokenId,
  tokenL1Address,
  transactionHash,
  txReceipt,
}: IAddWithdraw) {
  const iface = new ethers.utils.Interface(L2BridgeAbi);
  const { blockNumber, logs } = txReceipt;
  const log = logs.find(log => {
    try {
      const { name } = iface.parseLog(log);

      return name === 'Withdraw';
    } catch (e) {
      console.debug(e);
    }

    return false;
  });

  if (!log) {
    throw new Error('No related `Withdraw` event');
  }

  const [message] = ethers.utils.defaultAbiCoder.decode(['bytes'], log.data);
  const withdraw: Withdraw = {
    blockNumber,
    message,
    withdrawalHash: keccak256(message),
    transactionHash,
    from: account,
    amountOrTokenId: amountOrTokenId.toString(),
    tokenL1Address,
    timestamp: new Date().toISOString(),
  };

  saveWithdrawToStorage(withdraw);

  return keccak256(message);
}

export function getWithdrawByTransactionHash(transactionHash: string) {
  const data = localStorage.getItem(WITHDRAW_KEY);
  let withdrawList: Withdraw[] = [];

  try {
    withdrawList = data ? JSON.parse(data) : [];
  } catch (e) {
    console.log(e);
  }

  const withdrawal = withdrawList.find(withdraw => withdraw.transactionHash === transactionHash);

  // hack for backward-compatibale
  if (withdrawal && (withdrawal as any).hash) {
    withdrawList.forEach(withdrawal => {
      if ((withdrawal as any).hash) {
        withdrawal.withdrawalHash = (withdrawal as any).hash;
      }
    });
    localStorage.setItem(WITHDRAW_KEY, JSON.stringify(withdrawList));
  }

  return withdrawal;
}

export function getAllWithdrawal(): Withdraw[] {
  try {
    const widthdrawls = JSON.parse(localStorage.getItem(WITHDRAW_KEY) || '[]');
    let found = false;

    // hack for backward-compatibale
    widthdrawls.forEach((withdrawal: any) => {
      if (withdrawal.hash) {
        withdrawal.withdrawalHash = withdrawal.hash;
        found = true;
      }
    });

    if (found) {
      localStorage.setItem(WITHDRAW_KEY, JSON.stringify(widthdrawls));
    }

    return widthdrawls as Withdraw[];
  } catch (e) {
    localStorage.setItem(WITHDRAW_KEY, JSON.stringify([]));

    return [];
  }
}

export function isWithdrawalDataComplete(withdrawal: Withdraw): withdrawal is WithdrawData {
  return !!withdrawal.blockNumber && !!withdrawal.withdrawalHash && !!withdrawal.message;
}
