import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Box, Button, Container, Grid, Stack, Typography, useTheme } from '@mui/material';
import { BigNumber } from 'ethers';
import { FC, ReactNode, useEffect, useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import Breadcrumbs from '../../components/Breadcrumbs';
import IconCircleChecked from '../../components/icons/IconCircleChecked';
import IconLoadCenter from '../../components/icons/IconLoadCenter';
import IconLoadCircle from '../../components/icons/IconLoadCircle';
import IconNotFound from '../../components/icons/IconNotFound';
import ProgressStepper from '../../components/ProgressStepper';
import TransferAmount from '../../components/TransferAmount';
import TransferDirection from '../../components/TransferDirection';
import { useConfig } from '../../contexts/ConfigContext';
import { isDepositDataComplete, saveDepositToStorage } from '../../core/storage/deposit';
import useDeposit from '../../hooks/useDeposit';
import { DepositStatus, useDepositStatus } from '../../hooks/useDepositStatus';

const steps = [DepositStatus.Initiated, DepositStatus.Finalized];

const DepositProgressContent: FC<{ statusText: string; Icon: ReactNode }> = ({
  Icon,
  statusText,
}) => {
  return (
    <Grid
      alignItems="center"
      container
      direction="column"
      justifyContent="center"
      minHeight="10rem"
      spacing={2}
    >
      <Grid item>{Icon}</Grid>
      <Grid item>
        <Typography sx={{ color: '#fff' }}>{statusText}</Typography>
      </Grid>
    </Grid>
  );
};

const DepositProgress: React.FC = () => {
  const { transactionHash } = useParams<{ transactionHash: string }>();
  const { deposit, firstFetching, status } = useDepositStatus(transactionHash);
  const depositInLocalStorage = useDeposit(transactionHash);
  const { tokens } = useConfig();
  const token = useMemo(
    () => tokens.find(token => token.l1Address === deposit?.tokenL1Address),
    [deposit?.tokenL1Address, tokens]
  );
  const theme = useTheme();
  const activeStep = steps.findIndex(cur => cur === status);

  useEffect(() => {
    if (!deposit) {
      return;
    }

    if (depositInLocalStorage && isDepositDataComplete(depositInLocalStorage)) {
      return;
    }

    saveDepositToStorage(deposit);
  }, [deposit, depositInLocalStorage]);

  return (
    <Box>
      <Breadcrumbs
        links={[
          { href: '/', name: 'home' },
          { href: '/transactions', name: 'transactions' },
          { name: 'deposit progress' },
        ]}
      />
      <Container
        sx={{
          background: theme.colors.functional.container.default,
          borderRadius: '4px',
          py: 3,
          my: 1,
        }}
      >
        <Typography variant="h5">Deposit progress</Typography>
        {deposit && <TransferDirection from="l1" />}
        {token && (
          <TransferAmount
            amount={BigNumber.from(deposit?.amountOrTokenId)}
            from="l1"
            mb={5}
            token={token}
          />
        )}
        {status !== DepositStatus.Unknown && (
          <ProgressStepper activeStep={activeStep} steps={steps} />
        )}
        {status === DepositStatus.Finalized ? (
          <>
            <DepositProgressContent
              Icon={<IconCircleChecked sx={{ width: 60, height: 60 }} />}
              statusText="Deposit finalized"
            />
            <Button
              component={NavLink}
              fullWidth
              sx={{ textTransform: 'none' }}
              to="/deposit"
              variant="contained"
            >
              Back to home
            </Button>
          </>
        ) : status === DepositStatus.Initiated ? (
          <DepositProgressContent
            Icon={<CurrencyExchangeIcon sx={{ width: 60, height: 60, fill: '#6667AB' }} />}
            statusText="Deposit initiated"
          />
        ) : (
          <Stack alignItems="center" mt={4.5} pb={2.5} pt={2.5} sx={{ position: 'relative' }}>
            {firstFetching ? (
              <>
                <IconLoadCircle
                  sx={{
                    height: '80px',
                    width: '80px',
                    animation: 'rotation 1.5s infinite linear',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    margin: 'auto',
                  }}
                />
                <IconLoadCenter
                  sx={{
                    height: '40px',
                    width: '40px',
                  }}
                />
                <Typography mt={4.5} variant="body2">
                  Retrieving transaction details, please wait a moment…
                </Typography>
              </>
            ) : (
              <>
                <IconNotFound
                  sx={{
                    height: '80px',
                    width: '80px',
                  }}
                />
                <Typography mt={2.5} variant="body2">
                  {depositInLocalStorage?.message
                    ? 'Failed to fetch deposit status'
                    : 'Sorry, no transaction details were found by giving transaction hash'}
                </Typography>
              </>
            )}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default DepositProgress;
