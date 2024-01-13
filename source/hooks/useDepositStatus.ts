import { useEffect, useMemo, useRef, useState } from 'react';
import { catchError, from, mergeMap, Observable, of, throwError, zip } from 'rxjs';

import { loadDeposit } from '../components/ImportTransaction/LoadDepositButton';
import { useConfig } from '../contexts/ConfigContext';
import { L2Bridge } from '../core/Bridge';
import {
  Deposit,
  getDepositByTransactionHash,
  isDepositDataComplete,
} from '../core/storage/deposit';
import { DepositData } from '../core/type';
import useNativeTokenConfig from './useNativeTokenConfig';
import { usePeriodicalSignal } from './usePeriodically';
import { useStaticProvider } from './useStaticProvider';

export enum DepositStatus {
  Unknown = 'Unknown',
  Initiated = 'Initiated',
  Finalized = 'Finalized',
}

export const useDepositStatus = (
  txHash: string | undefined
): {
  firstFetching: boolean;
  status: DepositStatus;
  deposit: Deposit | null;
} => {
  const l1Provider = useStaticProvider('l1');
  const l2Provider = useStaticProvider('l2');
  const [finalized, setFinalized] = useState<boolean>();
  const [deposit, setDeposit] = useState<DepositData | null>(null);
  const { l2 } = useConfig();
  const nativeToken = useNativeTokenConfig();
  const [firstFetching, setFirstFetching] = useState(true);
  const { signal, stop$ } = usePeriodicalSignal(8000);
  const depositInLS = useMemo(
    () => (txHash ? getDepositByTransactionHash(txHash) : undefined),
    [txHash]
  );
  const retryTimes = useRef(0);

  useEffect(() => {
    if (!txHash || !nativeToken?.l1Address) {
      return;
    }

    let deposit$: Observable<DepositData>;

    if (!depositInLS || !isDepositDataComplete(depositInLS)) {
      deposit$ = from(loadDeposit(l1Provider, txHash, nativeToken.l1Address)).pipe(
        catchError(error => {
          // no related deposit transaction, stop to query periodically
          if (retryTimes.current < 4) {
            retryTimes.current++;
          } else {
            stop$.next();
          }

          return throwError(() => error);
        })
      );
    } else {
      deposit$ = of(depositInLS);
    }

    const sub = deposit$
      .pipe(
        mergeMap(deposit => {
          const l2Bridge = new L2Bridge(l2.bridgeAddress, l2Provider);

          return zip([of(deposit), from(l2Bridge.depositFinalized(deposit.message))]);
        })
      )
      .subscribe({
        next([deposit, finalized]) {
          setDeposit(deposit);
          setFinalized(finalized);
          setFirstFetching(false);

          if (finalized) {
            stop$.next();
          }
        },
        error() {
          setFirstFetching(false);
        },
      });

    return () => sub.unsubscribe();
  }, [signal, l2.bridgeAddress, l2Provider, txHash, nativeToken, l1Provider, stop$, depositInLS]);

  return useMemo(() => {
    if (firstFetching) {
      return {
        firstFetching,
        status: DepositStatus.Unknown,
        deposit,
      };
    }

    if (isUndefined(finalized)) {
      return {
        firstFetching,
        status: DepositStatus.Unknown,
        deposit,
      };
    }

    if (finalized) {
      return {
        firstFetching,
        status: DepositStatus.Finalized,
        deposit,
      };
    }

    return {
      firstFetching,
      status: DepositStatus.Initiated,
      deposit,
    };
  }, [deposit, finalized, firstFetching]);
};

function isUndefined(...values: any[]): boolean {
  return !values.every(value => value !== undefined);
}
