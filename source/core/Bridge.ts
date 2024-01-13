import type { Signer } from '@ethersproject/abstract-signer';
import type { Provider, TransactionResponse } from '@ethersproject/providers';

import { BigNumber, BigNumberish } from '@ethersproject/bignumber';

import * as abis from './abis';
import { BaseContract } from './base';
import { assert, callMethod } from './utils';

export enum WithdrawStatusInContract {
  Unproven,
  Proven,
  Finalized,
}

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

class L1Bridge extends BaseContract {
  constructor(address: string, signerOrProvider: Signer | Provider, abi = abis.L1BridgeAbi) {
    super(address, signerOrProvider, abi);
  }

  async depositNative(amount: BigNumberish, to: string): Promise<TransactionResponse> {
    assert(BigNumber.from(amount).gt(0), 'amount should be greater than 0');
    const signer = this.signer;

    assert(signer, 'no signer provided');

    const override = { value: BigNumber.from(amount).toString() };

    return callMethod(this.contract, 'depositNative', [to], override);
  }

  async depositERC20(
    l1Token: string,
    to: string,
    amount: BigNumberish
  ): Promise<TransactionResponse> {
    assert(BigNumber.from(amount).gt(0), 'amount should be greater than 0');
    const signer = this.signer;

    assert(signer, 'no signer provided');

    return callMethod(this.contract, 'depositERC20', [l1Token, to, amount]);
  }

  async depositERC721(l1Token: string, to: string, tokenId: number): Promise<TransactionResponse> {
    const signer = this.signer;

    assert(signer, 'no signer provided');

    return callMethod(this.contract, 'depositERC721', [l1Token, to, tokenId]);
  }

  withdrawStatus(withdrawHash: string): Promise<WithdrawStatusInContract> {
    return this.contract.withdrawStatus(withdrawHash);
  }

  getChallengePeriod(): Promise<BigNumber> {
    return this.contract.getChallengePeriod();
  }

  getLatestL2Checkpoint(): Promise<BigNumber> {
    return this.contract.getLatestL2Checkpoint();
  }

  getCommitDetail(checkpoint: number): Promise<{
    commitHash: string;
    l1BlockNumber: BigNumber;
    submitter: string;
  }> {
    return this.contract.getCommitDetail(checkpoint);
  }

  finalizeWithdraw(
    checkpoint: BigNumberish,
    headerHash: string,
    withdrawRoot: string,
    withdrawProof: string,
    withdrawMessage: string
  ): Promise<TransactionResponse> {
    const signer = this.signer;

    assert(signer, 'no signer provided');

    return callMethod(this.contract, 'finalizeWithdraw', [
      checkpoint,
      headerHash,
      withdrawRoot,
      withdrawProof,
      withdrawMessage,
    ]);
  }
}

class L2Bridge extends BaseContract {
  constructor(address: string, signerOrProvider: Signer | Provider, abi = abis.L2BridgeAbi) {
    super(address, signerOrProvider, abi);
  }

  async withdrawNative(amount: BigNumberish, to: string): Promise<TransactionResponse> {
    assert(BigNumber.from(amount).gt(0), 'amount should be greater than 0');
    assert(to !== ZERO_ADDRESS, 'to should not be zero address');
    const signer = this.signer;

    assert(signer, 'no signer provided');

    return callMethod(this.contract, 'withdrawNative', [to, amount]);
  }

  async withdrawERC20(
    l2Token: string,
    to: string,
    amount: BigNumberish
  ): Promise<TransactionResponse> {
    assert(BigNumber.from(amount).gt(0), 'amount should be greater than 0');
    assert(to !== ZERO_ADDRESS, 'to should not be zero address');
    const signer = this.signer;

    assert(signer, 'no signer provided');

    return callMethod(this.contract, 'withdrawERC20', [l2Token, to, amount]);
  }

  checkpointFixedLength(): Promise<BigNumber> {
    return this.contract.checkpointFixedLength();
  }

  async withdrawERC721(l1Token: string, to: string, tokenId: number): Promise<TransactionResponse> {
    const signer = this.signer;

    assert(signer, 'no signer provided');
    assert(to !== ZERO_ADDRESS, 'to should not be zero address');

    return callMethod(this.contract, 'withdrawERC721', [l1Token, to, tokenId]);
  }

  blockCheckpoint(blockNumber: number): Promise<BigNumber> {
    return this.contract.blockCheckpoint(blockNumber);
  }

  withdrawRoot(checkpoint: number): Promise<string> {
    return this.contract.withdrawRoot(checkpoint);
  }

  withdrawProof(withdrawHash: string, blockNumber: number): Promise<string> {
    return this.contract.withdrawProof(withdrawHash, blockNumber);
  }

  depositFinalized(message: string): Promise<boolean> {
    return this.contract.depositFinalized(message);
  }
}

export { L1Bridge, L2Bridge };
