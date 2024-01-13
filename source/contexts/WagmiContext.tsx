import { connectorsForWallets, darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { createContext, useContext, useMemo, useState } from 'react';
import { Chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

interface Context {
  setChainsConfig: React.Dispatch<React.SetStateAction<Chain[]>>;
  chainsConfig: Chain[];
  chains: Chain[];
}

export const WagmiContext = createContext<Context>({} as Context);

export const useWagmi = () => {
  return useContext(WagmiContext);
};

const appName = 'AltLayer Rollup Bridge';

const theme = darkTheme();

theme.colors.accentColor = '#6667ab';
theme.colors.profileForeground = '#373741';
theme.colors.modalBackground = '#373741';
theme.radii.modal = '16px';

export const WagmiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chainsConfig, setChainsConfig] = useState<Chain[]>(window.appConfig.networks);

  const { chains: configuredChains, provider } = configureChains(chainsConfig, [publicProvider()]);

  const connectors = useMemo(
    () =>
      connectorsForWallets([
        {
          groupName: 'Recommended',
          wallets: [
            metaMaskWallet({ chains: configuredChains }),
            rainbowWallet({ chains: configuredChains }),
            walletConnectWallet({ chains: configuredChains }),
            coinbaseWallet({ chains: configuredChains, appName }),
          ],
        },
      ]),
    [configuredChains]
  );

  const wagmiClient = useMemo(
    // Reinitialize the wagmi client if new configs are set (Usually when new networks are added via setChainsConfig)
    () =>
      createClient({
        autoConnect: true,
        connectors,
        provider,
      }),
    [provider, connectors]
  );

  return (
    <WagmiContext.Provider value={{ chains: configuredChains, chainsConfig, setChainsConfig }}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={configuredChains} theme={theme}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </WagmiContext.Provider>
  );
};
