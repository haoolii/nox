import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Stack, useTheme } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSwitchNetwork } from 'wagmi';

import { useConfig } from '../contexts/ConfigContext';
import { useCustomSearchParams } from '../hooks/useCustomSearchParams';

const SwitchTransferDirection: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { searchParms } = useCustomSearchParams<{ token?: string }>();
  const switchNetwork = useSwitchNetwork();
  const { l1, l2 } = useConfig();
  const theme = useTheme();

  return (
    <Stack flexDirection="row" justifyContent="center" pb={1} pt={0.75}>
      <ArrowDownwardIcon
        onClick={() => {
          const currentIsDeposit = pathname.includes('/deposit');

          currentIsDeposit
            ? navigate(searchParms.token ? `/withdraw?token=${searchParms.token}` : '/withdraw')
            : navigate(searchParms.token ? `/deposit?token=${searchParms.token}` : '/deposit');
          switchNetwork.switchNetwork?.(currentIsDeposit ? l2.id : l1.id);
        }}
        sx={{
          color: 'white',
          background: theme.colors.functional.container.dark,
          height: '40px',
          width: '40px',
          borderRadius: '50%',
          padding: '7px',
          cursor: 'pointer',
          ':hover': {
            background: theme.colors.functional.container.primary,
            color: theme.colors.schema.secondary,
          },
        }}
      />
    </Stack>
  );
};

export default SwitchTransferDirection;
