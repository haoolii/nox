export type { Address } from 'abitype';

export type Side = 'l1' | 'l2';

export enum TxType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}

export interface DepositData {
  message: string;
  blockNumber: number;
  depositHash: string;
  transactionHash: string;
  from: string;
  amountOrTokenId: string;
  tokenL1Address: string;
  timestamp: string;
}

export interface WithdrawData {
  blockNumber: number;
  message: string;
  withdrawalHash: string;
  transactionHash: string;
  from: string;
  amountOrTokenId: string;
  tokenL1Address: string;
  timestamp: string;
}
