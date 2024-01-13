import { useMemo } from 'react';

import { useConfig } from '../contexts/ConfigContext';
import { L1Bridge, L2Bridge } from '../core/Bridge';
import { useStaticProvider } from './useStaticProvider';

export const useL1Bridge = () => {
  const { l1 } = useConfig();
  const l1Provider = useStaticProvider('l1');

  return useMemo(() => {
    return new L1Bridge(l1.bridgeAddress, l1Provider);
  }, [l1.bridgeAddress, l1Provider]);
};

export const useL2Bridge = () => {
  const { l2 } = useConfig();
  const l2Provider = useStaticProvider('l2');

  return useMemo(() => {
    return new L2Bridge(l2.bridgeAddress, l2Provider);
  }, [l2.bridgeAddress, l2Provider]);
};
