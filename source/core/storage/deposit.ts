import { TransactionReceipt } from '@ethersproject/providers';
import { BigNumberish, ethers } from 'ethers';
import { keccak256 } from 'ethers/lib/utils.js';

import { L1BridgeAbi } from '../../core/abis';
import { DepositData } from '../type';

export const DEPOSIT_KEY = 'deposit-list';

export interface Deposit {
  message?: string;
  blockNumber?: number;
  depositHash?: string;
  transactionHash: string;
  from: string;
  amountOrTokenId: string;
  // for indexing token
  tokenL1Address: string;
  timestamp: string;
}

interface IAddDeposit {
  transactionHash: string;
  txReceipt: TransactionReceipt;
  amountOrTokenId: BigNumberish;
  tokenL1Address: string;
  account: string;
}

export function saveDepositToStorage(deposit: Deposit) {
  const data = localStorage.getItem(DEPOSIT_KEY);
  let depositList: Deposit[] = [];

  try {
    depositList = data ? JSON.parse(data) : [];
  } catch (e) {
    console.error(e);
  }

  const existingIndex = depositList.findIndex(
    _deposit =>
      (_deposit.depositHash &&
        deposit.depositHash &&
        _deposit.depositHash === deposit.depositHash) ||
      (_deposit.transactionHash &&
        deposit.transactionHash &&
        _deposit.transactionHash === deposit.transactionHash)
  );

  if (existingIndex < 0) {
    depositList.push(deposit);
  } else {
    depositList.splice(existingIndex, 1, deposit);
  }

  localStorage.setItem(DEPOSIT_KEY, JSON.stringify(depositList));
}

export function addDeposit({
  account,
  amountOrTokenId,
  tokenL1Address,
  transactionHash,
  txReceipt,
}: IAddDeposit): string {
  const l1Iface = new ethers.utils.Interface(L1BridgeAbi);
  const { blockNumber, logs } = txReceipt;
  const log = logs
    .map(log => {
      try {
        return l1Iface.parseLog(log);
      } catch (e) {
        return undefined;
      }
    })
    .find(log => log?.name === 'Deposit');

  if (!log) {
    throw new Error('No related `Deposit` event');
  }

  const message = log.args.message.toString();
  const depositHash = keccak256(log.args.message);
  const deposit: Deposit = {
    message,
    blockNumber,
    depositHash,
    transactionHash,
    from: account,
    amountOrTokenId: amountOrTokenId.toString(),
    tokenL1Address,
    timestamp: new Date().toISOString(),
  };

  saveDepositToStorage(deposit);

  return depositHash;
}

export function getDepositByTransactionHash(transactionHash: string): Deposit | undefined {
  const data = localStorage.getItem(DEPOSIT_KEY);
  let depositList: Deposit[] = [];

  try {
    depositList = data ? JSON.parse(data) : [];
  } catch (e) {
    console.debug(e);
  }

  return depositList.find(deposit => deposit.transactionHash === transactionHash);
}

export function isDepositDataComplete(deposit: Deposit): deposit is DepositData {
  return !!deposit.blockNumber && !!deposit.depositHash && !!deposit.message;
}
