import { LoadingButton } from '@mui/lab';
import { alpha, Button, ButtonProps, useTheme } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FC } from 'react';
import { useSwitchNetwork } from 'wagmi';

import { useConfig } from '../contexts/ConfigContext';

const EnsureNetworkButton: FC<
  {
    targetChainId: number;
    children?: React.ReactNode;
  } & ButtonProps
> = ({ children, targetChainId, ...props }) => {
  const theme = useTheme();
  const switchNetwork = useSwitchNetwork();
  const { l1, l2 } = useConfig();

  return (
    <ConnectButton.Custom>
      {({ account, authenticationStatus, chain, mounted, openChainModal, openConnectModal }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        if (!ready) {
          return <LoadingButton fullWidth loading={true} variant="contained" {...props} />;
        }

        if (!connected) {
          return (
            <Button onClick={openConnectModal} {...props}>
              Connect Wallet
            </Button>
          );
        }

        if (chain.unsupported) {
          return (
            <Button
              onClick={openChainModal}
              sx={Object.assign(
                {
                  background: theme.colors.schema.failure,
                  '&:hover': {
                    background: alpha(theme.colors.schema.failure, 0.8),
                  },
                },
                props.sx || {}
              )}
              {...props}
            >
              Wrong network
            </Button>
          );
        }

        if (chain.id !== targetChainId) {
          return (
            <Button
              onClick={() => {
                switchNetwork.switchNetwork
                  ? switchNetwork.switchNetwork(targetChainId)
                  : window.location.reload();
              }}
              {...props}
            >
              {switchNetwork.switchNetwork
                ? `Switch to ${l1.id === targetChainId ? l1.name : l2.name}`
                : `Please reload page or switch to ${
                    l1.id === targetChainId ? l1.name : l2.name
                  } in your wallet`}
            </Button>
          );
        }

        return children;
      }}
    </ConnectButton.Custom>
  );
};

export default EnsureNetworkButton;
