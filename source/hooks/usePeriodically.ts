import { useEffect, useMemo, useState } from 'react';
import { Subject, takeUntil, timer } from 'rxjs';

import { useUpdator } from './useUpdator';

type Millisecond = number;

export const usePeriodicalSignal = (intervalDuration: Millisecond, startDue?: Millisecond) => {
  const { signal, update } = useUpdator();
  const timer$ = useMemo(
    () =>
      typeof startDue === 'undefined' ? timer(intervalDuration) : timer(startDue, intervalDuration),
    [intervalDuration, startDue]
  );
  const [stop$] = useState(new Subject<void>());

  useEffect(() => {
    const sub = timer$.pipe(takeUntil(stop$)).subscribe(update);

    return () => sub.unsubscribe();
  }, [timer$, stop$, update]);

  return useMemo(
    () => ({
      signal,
      stop$,
      update,
    }),
    [signal, stop$, update]
  );
};
