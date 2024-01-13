import { useCallback, useMemo } from 'react';

import { ALERT_SEVERITY, useAlerts } from '../contexts/AlertsContext';
import { useConfig } from '../contexts/ConfigContext';
import { Side } from '../core/type';

const rejectedTextFromWallets = ['user rejected transaction'];

function useAlertTransaction(side: Side) {
  const { l1, l2 } = useConfig();
  const { alert } = useAlerts();
  const alertConfirmed = useCallback(
    (hash: string) => {
      alert({
        title: 'Transaction confirmed',
        severity: ALERT_SEVERITY.SUCCESS,
        link: {
          link: `${(side === 'l1' ? l1 : l2).blockExplorers?.default.url}/tx/${hash}`,
          label: 'View in explorer',
        },
      });
    },
    [alert, l1, l2, side]
  );
  const alertFailed = useCallback(
    (message: string) => {
      alert({
        title: 'Failed to submit transaction',
        desc: rejectedTextFromWallets.find(text => message.includes(text))
          ? 'User rejected transaction'
          : message,
        severity: ALERT_SEVERITY.ERROR,
      });
    },
    [alert]
  );

  return useMemo(
    () => ({
      alertConfirmed,
      alertFailed,
    }),
    [alertConfirmed, alertFailed]
  );
}

export default useAlertTransaction;
