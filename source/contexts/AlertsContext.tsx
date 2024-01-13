import { Box, Snackbar, Stack } from '@mui/material';
import { createContext, FC, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import Toast from '../components/Toast';
import { getKey } from '../core/utils';

export enum ALERT_SEVERITY {
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  WARNING = 'WARNING',
}

export const alertSeverity: Record<ALERT_SEVERITY, 'success' | 'info' | 'error'> = {
  [ALERT_SEVERITY.SUCCESS]: 'success',
  [ALERT_SEVERITY.INFO]: 'info',
  [ALERT_SEVERITY.DEBUG]: 'info',
  [ALERT_SEVERITY.WARNING]: 'error',
  [ALERT_SEVERITY.ERROR]: 'error',
};

type SetAlert = (alert: Omit<Alert, 'key'> & { error?: Error }) => string;
type RemoveAlert = (key: string) => void;

interface Alert {
  severity: ALERT_SEVERITY;
  timeout?: number;
  key: string;
  title: string;
  link?: {
    link: string;
    label: string;
  };
  desc?: string;
}

type AlertsContext = {
  alert: SetAlert;
};

export const AlertsContext = createContext<AlertsContext>({} as AlertsContext);

export const useAlerts = () => {
  return useContext(AlertsContext);
};

export const AlertsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const alert: SetAlert = useCallback(({ desc, error, link, severity, timeout = 6000, title }) => {
    if (error) {
      console.error(error);
    }

    const key = getKey();

    setAlerts(state => {
      return [{ severity, title, timeout, key, link, desc }, ...state];
    });
    setTimeout(() => {
      // remove alert after timeout
      setAlerts(state => state.filter(cur => cur.key !== key));
    }, timeout);

    return key;
  }, []);

  const removeAlert: RemoveAlert = key => {
    setAlerts(state => state.filter(cur => cur.key !== key));
  };

  const filteredAlerts = useMemo(() => {
    if (process.env.NODE_ENV === 'development') {
      return alerts;
    }

    return alerts.filter(cur => cur.severity !== ALERT_SEVERITY.DEBUG);
  }, [alerts]);

  return (
    <AlertsContext.Provider value={{ alert }}>
      {children}

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={filteredAlerts?.length > 0}
      >
        <Box>
          <Stack direction="column" spacing={1}>
            {filteredAlerts?.map(cur => (
              <Toast
                desc={cur.desc}
                duration={cur.timeout}
                key={cur.key}
                link={cur.link}
                onClose={() => {
                  removeAlert(cur.key);
                }}
                severity={cur.severity}
                title={cur.title}
              />
            ))}
          </Stack>
        </Box>
      </Snackbar>
    </AlertsContext.Provider>
  );
};
