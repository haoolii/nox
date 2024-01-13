import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          zIndex: 0,
          position: 'absolute',
          height: '100%',
          left: '0px',
          right: '0px',
        }}
      >
        <img
          src="/imgs/top.png"
          style={{
            width: '38%',
            height: 'auto',
            maxWidth: '550px',
            maxHeight: '300px',
            position: 'absolute',
            top: '0px',
            left: '0px',
          }}
        />
        <img
          src="/imgs/top.png"
          style={{
            width: '38%',
            height: 'auto',
            maxWidth: '550px',
            maxHeight: '300px',
            position: 'absolute',
            top: '0px',
            right: '0px',
            transform: 'scaleX(-1)',
          }}
        />
        <img
          src="/imgs/bottom.png"
          style={{
            width: '38%',
            height: 'auto',
            maxWidth: '550px',
            maxHeight: '300px',
            position: 'absolute',
            bottom: '0px',
            left: '0px',
          }}
        />
        <img
          src="/imgs/bottom.png"
          style={{
            width: '38%',
            height: 'auto',
            maxWidth: '550px',
            maxHeight: '300px',
            position: 'absolute',
            bottom: '0px',
            right: '0px',
            transform: 'scaleX(-1)',
          }}
        />
      </Box>
      <Box
        margin="0 auto"
        maxWidth="1440px"
        minHeight="100vh"
        position="relative"
        px={[1.5, 2, 2.5]}
        py={0}
        zIndex={10}
      >
        <Header />
        <Box
          sx={{
            minHeight: 'calc(100vh - 200px)',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
