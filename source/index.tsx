import '@rainbow-me/rainbowkit/styles.css';
import './polyfills';

import { ThemeProvider } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { AlertsProvider } from './contexts/AlertsContext';
import { ConfigProvider } from './contexts/ConfigContext';
import { TokenBalanceProvider } from './contexts/TokenBalanceContext';
import { WagmiProvider } from './contexts/WagmiContext';
import App from './App';
import { theme } from './theme';

const container = document.getElementById('root');

if (container) {
  const queryClient = new QueryClient();
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <WagmiProvider>
              <ConfigProvider>
                <AlertsProvider>
                  <TokenBalanceProvider>
                    <App />
                  </TokenBalanceProvider>
                </AlertsProvider>
              </ConfigProvider>
            </WagmiProvider>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
