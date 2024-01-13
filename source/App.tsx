import { Box, CssBaseline } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Deposit from './pages/Deposit';
import DepositProgress from './pages/DepositProgress';
import Disclaimer from './pages/Legal/Disclaimer';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TransactionHistory from './pages/TransactionHistory';
import Withdraw from './pages/Withdraw';
import WithdrawProgress from './pages/WithdrawProgress';
import { inputGlobalStyles } from './theme/globalStyle';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      {inputGlobalStyles}
      <Layout>
        <Routes>
          <Route
            element={
              <Box
                sx={{
                  mt: 10,
                  flexBasis: '552px',
                }}
              >
                <Withdraw />
              </Box>
            }
            path="/withdraw"
          />
          <Route
            element={
              <Box
                sx={{
                  mt: 10,
                  flexBasis: '552px',
                }}
              >
                <Deposit />
              </Box>
            }
            path="/deposit"
          />
          <Route
            element={
              <Box
                sx={{
                  mt: 10,
                  flexBasis: '552px',
                }}
              >
                <DepositProgress />
              </Box>
            }
            path="/deposit/progress/:transactionHash"
          />
          <Route
            element={
              <Box
                sx={{
                  mt: 10,
                  flexBasis: '552px',
                }}
              >
                <WithdrawProgress />
              </Box>
            }
            path="/withdraw/progress/:transactionHash"
          />
          <Route element={<TransactionHistory />} path="/transactions" />
          <Route
            element={
              <Box
                sx={{
                  overflow: 'scroll',
                }}
              >
                <Disclaimer />
              </Box>
            }
            path="/legal-disclaimer"
          />
          <Route
            element={
              <Box
                sx={{
                  overflow: 'scroll',
                }}
              >
                <PrivacyPolicy />
              </Box>
            }
            path="/privacy-policy"
          />
          <Route element={<Navigate to="/deposit" />} path="*" />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
