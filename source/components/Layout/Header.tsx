import { Grid } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import { Link } from 'react-router-dom';

import IconLogo from '../icons/IconLogo';

const Header: React.FC = () => {
  return (
    <Grid
      alignItems="center"
      container
      justifyContent="space-between"
      py={3.75}
      sx={{
        '& > a': {
          display: 'inline-flex',
          alignItems: 'center',
        },
      }}
    >
      <Link to="/deposit">
        <IconLogo />
      </Link>
      <ConnectButton />
    </Grid>
  );
};

export default Header;
