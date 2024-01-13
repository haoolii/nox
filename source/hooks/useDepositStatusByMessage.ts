import { useEffect, useMemo, useState } from 'react';

import { useConfig } from '../contexts/ConfigContext';
import { L2Bridge } from '../core/Bridge';
import { DepositStatus } from './useDepositStatus';
import { useStaticProvider } from './useStaticProvider';

export const useDepositStatusByMessage = (
  message: string | undefined,
  signal: number
): DepositStatus => {
  const l2Provider = useStaticProvider('l2');
  const [finalized, setFinalized] = useState<boolean>();
  const { l2 } = useConfig();

  useEffect(() => {
    if (!message) {
      return;
    }

    const l2Bridge = new L2Bridge(l2.bridgeAddress, l2Provider);

    l2Bridge.depositFinalized(message).then(finalized => {
      setFinalized(finalized);
    });
  }, [signal, l2.bridgeAddress, l2Provider, message]);

  return useMemo(() => {
    if (isUndefined(finalized)) {
      return DepositStatus.Unknown;
    }

    if (finalized) {
      return DepositStatus.Finalized;
    }

    return DepositStatus.Initiated;
  }, [finalized]);
};

function isUndefined(...values: any[]): boolean {
  return !values.every(value => value !== undefined);
}
