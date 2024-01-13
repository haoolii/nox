import { useEffect, useMemo, useRef, useState } from 'react';
import { from, map, mergeMap, Observable, of, zip } from 'rxjs';

import { loadWithdrawal } from '../components/ImportTransaction/LoadWithdrawalButton';
import { WithdrawStatusInContract } from '../core/Bridge';
import { isWithdrawalDataComplete } from '../core/storage/withdraw';
import { WithdrawData } from '../core/type';
import { useL1Bridge, useL2Bridge } from './useBridge';
import useNativeTokenConfig from './useNativeTokenConfig';
import { usePeriodicalSignal } from './usePeriodically';
import { useStaticProvider } from './useStaticProvider';
import { useWithdrawInLS } from './useWithdrawInLS';

export enum WithdrawStatus {
  Unknown = 'Unknown',
  Initiated = 'initiated',
  Committed = 'Committed',
  Withdrawable = 'Withdrawable',
  Withdrawed = 'Withdrawed',
}

interface UseWithdrawStatusReturn {
  withdrawalStatus: WithdrawStatus;
  blocksUntilWithdrawable: number | undefined;
  withdrawal: WithdrawData | null;
  firstFetching: boolean;
  targetL2Checkpoint: number | undefined;
}

export const useWithdrawStatus = (txnHash: string | undefined): UseWithdrawStatusReturn => {
  const [committed, setCommitted] = useState<boolean>();
  const [withdrawable, setWithdrawable] = useState<boolean>();
  const [withdrawed, setWithdrawed] = useState<boolean>();
  const [blocksUntilWithdrawable, setBlocksUntilWithdrawable] = useState<number>();
  const [firstFetching, setFirstFetching] = useState(true);
  const [targetL2Checkpoint, setTargetL2Checkpoint] = useState<number>();
  const [withdrawal, setWithdrawal] = useState<WithdrawData | null>(null);
  const l1Provider = useStaticProvider('l1');
  const l2Provider = useStaticProvider('l2');
  const l1Bridge = useL1Bridge();
  const l2Bridge = useL2Bridge();
  const nativeToken = useNativeTokenConfig();
  const { signal, stop$ } = usePeriodicalSignal(4000);
  const withdrawalInLS = useWithdrawInLS(txnHash);
  const retryTimes = useRef(0);

  useEffect(() => {
    if (!txnHash || !nativeToken) {
      return;
    }

    let withdrawal$: Observable<WithdrawData>;
    let blockNumber$: Observable<number>;

    if (withdrawalInLS && isWithdrawalDataComplete(withdrawalInLS)) {
      withdrawal$ = of(withdrawalInLS);
      blockNumber$ = of(withdrawalInLS.blockNumber);
    } else {
      withdrawal$ = from(loadWithdrawal(l2Provider, txnHash, nativeToken?.l1Address));
      blockNumber$ = from(l2Provider.getTransactionReceipt(txnHash)).pipe(
        map(receipt => receipt.blockNumber)
      );
    }

    const targetL2Checkpoint$ = blockNumber$.pipe(
      mergeMap(blockNumber => from(l2Bridge.blockCheckpoint(blockNumber))),
      map(checkpoint => checkpoint.toNumber())
    );

    const sub = zip([targetL2Checkpoint$, withdrawal$])
      .pipe(
        mergeMap(([targetL2Checkpoint, withdrawal]) => {
          const l1CurrentBlockNumber$ = from(l1Provider.getBlockNumber());
          const latestL2Checkpoint$ = from(l1Bridge.getLatestL2Checkpoint());
          const challengePeriod$ = from(l1Bridge.getChallengePeriod());
          const withdrawStatus$ = from(l1Bridge.withdrawStatus(withdrawal.withdrawalHash));
          const commitDetail$ = from(l1Bridge.getCommitDetail(targetL2Checkpoint));

          return zip([
            latestL2Checkpoint$,
            l1CurrentBlockNumber$,
            challengePeriod$,
            withdrawStatus$,
            commitDetail$,
            of(targetL2Checkpoint),
            of(withdrawal),
          ]);
        })
      )
      .subscribe({
        next([
          latestL2Checkpoint,
          currentL1BlockNumber,
          challengePeriod,
          withdrawStatus,
          commitDetail,
          targetL2Checkpoint,
          withdrawal,
        ]) {
          const l1CommittedBlockNumber = commitDetail.l1BlockNumber.toNumber();
          const commited = latestL2Checkpoint.toNumber() >= targetL2Checkpoint;
          const targetL1BlockNumber = l1CommittedBlockNumber + challengePeriod.toNumber();
          const withdrawed = WithdrawStatusInContract.Finalized === withdrawStatus;
          const withdrawable = commited && currentL1BlockNumber >= targetL1BlockNumber;

          setFirstFetching(false);
          setCommitted(commited);
          setWithdrawable(withdrawable);
          setBlocksUntilWithdrawable(withdrawable ? 0 : targetL1BlockNumber - currentL1BlockNumber);
          setWithdrawed(withdrawed);
          setTargetL2Checkpoint(targetL2Checkpoint);
          setWithdrawal(withdrawal);

          if (withdrawable || withdrawed) {
            stop$.next();
          }
        },

        error(e) {
          console.debug(e);
          setFirstFetching(false);

          if (retryTimes.current < 3) {
            retryTimes.current++;
          } else {
            stop$.next();
          }
        },
      });

    return () => sub.unsubscribe();
  }, [
    l1Bridge,
    l1Provider,
    l2Bridge,
    l2Provider,
    nativeToken,
    signal,
    stop$,
    txnHash,
    withdrawalInLS,
  ]);

  const withdrawalStatus = useMemo(() => {
    if (isUndefined(committed, withdrawable, withdrawed)) {
      return WithdrawStatus.Unknown;
    }

    if (withdrawed) {
      return WithdrawStatus.Withdrawed;
    }

    if (withdrawable) {
      return WithdrawStatus.Withdrawable;
    }

    if (committed) {
      return WithdrawStatus.Committed;
    }

    return WithdrawStatus.Initiated;
  }, [committed, withdrawable, withdrawed]);

  return useMemo(
    () => ({
      withdrawalStatus,
      blocksUntilWithdrawable,
      withdrawal,
      firstFetching,
      targetL2Checkpoint,
    }),
    [blocksUntilWithdrawable, firstFetching, targetL2Checkpoint, withdrawal, withdrawalStatus]
  );
};

function isUndefined(...values: any[]): boolean {
  return !values.every(value => value !== undefined);
}
