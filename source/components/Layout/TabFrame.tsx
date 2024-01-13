import { Container, useTheme } from '@mui/material';
import React from 'react';

import Tabs from '../Tabs';

const TabFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        background: theme.colors.functional.container.default,
        padding: '24px',
        border: '1px solid rgba(255,255,255,0.04)',
        borderRadius: '16px',
        boxShadow: '0px 0px 40px 0px rgba(26,26,37,0.20)',
      }}
    >
      <Tabs
        paths={[
          {
            path: '/deposit',
            title: 'Deposit',
          },
          {
            path: '/withdraw',
            title: 'Withdraw',
          },
        ]}
      />
      {children}
    </Container>
  );
};

export default TabFrame;
