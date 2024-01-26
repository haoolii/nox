import { WithdrawStatusInContract } from "../core/Bridge";
import { loadWithdrawal } from "../core/loadWithdrawal";
import { WithdrawData } from "../core/type";
import { useL1Bridge, useL2Bridge } from "./useBridge";
import { useNativeTokenConfig } from "./useNativeTokenConfig";
import { useStaticProvider } from "./useStaticProvider";

export enum WithdrawStatus {
  Unknown = "Unknown",
  Initiated = "initiated",
  Committed = "Committed",
  Withdrawable = "Withdrawable",
  Withdrawed = "Withdrawed",
}

interface UseWithdrawStatusReturn {
  withdrawalStatus: WithdrawStatus;
  blocksUntilWithdrawable: number | undefined;
  withdrawal: WithdrawData | null;
  targetL2Checkpoint: number | undefined;
}

export const useWithdrawStatus = async (
  txnHash: string | undefined
): Promise<UseWithdrawStatusReturn> => {
  try {
    const l1Provider = useStaticProvider("l1");
    const l1Bridge = useL1Bridge();
    const l2Bridge = useL2Bridge();
    const nativeToken = useNativeTokenConfig();
    const l2Provider = useStaticProvider("l2");

    const withdrawal = await loadWithdrawal(
      l2Provider,
      txnHash,
      nativeToken?.l1Address
    );

    const receipt = await l2Provider.getTransactionReceipt(txnHash);
    const blockNumber = receipt.blockNumber;

    const targetL2Checkpoint = (
      await l2Bridge.blockCheckpoint(blockNumber)
    ).toNumber();

    const commitDetail = await l1Bridge.getCommitDetail(targetL2Checkpoint);
    const l1CommittedBlockNumber = commitDetail.l1BlockNumber.toNumber();
    const latestL2Checkpoint = await l1Bridge.getLatestL2Checkpoint();
    const committed = latestL2Checkpoint.toNumber() >= targetL2Checkpoint;

    const challengePeriod = await l1Bridge.getChallengePeriod();
    const targetL1BlockNumber =
      l1CommittedBlockNumber + challengePeriod.toNumber();

    const withdrawStatus = await l1Bridge.withdrawStatus(
      withdrawal.withdrawalHash
    );

    const withdrawed = WithdrawStatusInContract.Finalized === withdrawStatus;
    const currentL1BlockNumber = await l1Provider.getBlockNumber();
    const withdrawable =
      committed && currentL1BlockNumber >= targetL1BlockNumber;
    const blocksUntilWithdrawable = withdrawable
      ? 0
      : targetL1BlockNumber - currentL1BlockNumber;

    let withdrawalStatus = WithdrawStatus.Initiated;
    if (isUndefined(committed, withdrawable, withdrawed)) {
      withdrawalStatus = WithdrawStatus.Unknown;
    }

    if (withdrawed) {
      withdrawalStatus = WithdrawStatus.Withdrawed;
    }

    if (withdrawable) {
      withdrawalStatus = WithdrawStatus.Withdrawable;
    }

    if (committed) {
      withdrawalStatus = WithdrawStatus.Committed;
    }

    return {
      withdrawalStatus,
      blocksUntilWithdrawable,
      withdrawal,
      targetL2Checkpoint,
    };
  } catch (error) {
    console.error("Error in useWithdrawStatus:", error);
    // Handle the error or rethrow as needed
    throw error;
  }
};

function isUndefined(...values: any[]): boolean {
  return !values.every((value) => value !== undefined);
}
