import { Box, Button, Container, Grid, Stack, Typography, useTheme } from '@mui/material';
import { BigNumber } from 'ethers';
import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import Breadcrumbs from '../../components/Breadcrumbs';
import IconAwaitingChallengePeriod from '../../components/icons/IconAwaitingChallengePeriod';
import IconCircleChecked from '../../components/icons/IconCircleChecked';
import IconLoadCenter from '../../components/icons/IconLoadCenter';
import IconLoadCircle from '../../components/icons/IconLoadCircle';
import IconNotFound from '../../components/icons/IconNotFound';
import IconWithdrawable from '../../components/icons/IconWithdrawable';
import IconWithdrawInitiated from '../../components/icons/IconWithdrawInitiated';
import ProgressStepper from '../../components/ProgressStepper';
import TransferAmount from '../../components/TransferAmount';
import TransferDirection from '../../components/TransferDirection';
import {
  isWithdrawalDataComplete,
  saveWithdrawToStorage,
  Withdraw,
} from '../../core/storage/withdraw';
import useToken from '../../hooks/useToken';
import { useWithdrawInLS } from '../../hooks/useWithdrawInLS';
import { useWithdrawStatus, WithdrawStatus } from '../../hooks/useWithdrawStatus';
import FinalizeWithdrawButton from './FinalizeWithdrawButton';

interface IProgressContentArgs {
  withdrawalStatus: WithdrawStatus;
  targetL2Checkpoint: number | undefined;
  withdrawal: Withdraw | null;
  blocksUntilWithdrawable: number | undefined;
  firstFetching: boolean;
  withdralInLS: Withdraw | null;
  onWithdrawed?: () => void;
  withdrawed: boolean;
}

const WithdrawalProgressContent: FC<{ statusText: string; Icon: ReactNode }> = ({
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

const Withdrawed = (
  <>
    <WithdrawalProgressContent
      Icon={<IconCircleChecked sx={{ width: 60, height: 60 }} />}
      statusText="Completed"
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
);

const renderWithdrawalProgressContent = ({
  blocksUntilWithdrawable,
  firstFetching,
  onWithdrawed,
  targetL2Checkpoint,
  withdralInLS,
  withdrawal,
  withdrawalStatus,
  withdrawed,
}: IProgressContentArgs) => {
  if (withdrawed) {
    return Withdrawed;
  }

  switch (withdrawalStatus) {
    case WithdrawStatus.Initiated:
      return (
        <WithdrawalProgressContent
          Icon={<IconWithdrawInitiated sx={{ width: 60, height: 60 }} />}
          statusText="Waiting for verifier to post transaction commitment"
        />
      );
    case WithdrawStatus.Committed:
      return (
        <WithdrawalProgressContent
          Icon={<IconAwaitingChallengePeriod sx={{ width: 60, height: 60 }} />}
          statusText={`Waiting for challenge period: ${blocksUntilWithdrawable} blocks remaining`}
        />
      );
    case WithdrawStatus.Withdrawable:
      return (
        <>
          <WithdrawalProgressContent
            Icon={<IconWithdrawable sx={{ width: 60, height: 60 }} />}
            statusText="Ready to withdraw"
          />
          <FinalizeWithdrawButton
            onWithdrawed={onWithdrawed}
            targetL2Checkpoint={targetL2Checkpoint}
            withdraw={withdrawal}
          />
        </>
      );
    case WithdrawStatus.Withdrawed:
      return Withdrawed;
    default:
      return (
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
                {withdralInLS?.message
                  ? 'Failed to fetch withdrawal status'
                  : 'Sorry, no transaction details were found by giving transaction hash'}
              </Typography>
            </>
          )}
        </Stack>
      );
  }
};

const steps = [
  WithdrawStatus.Initiated,
  WithdrawStatus.Committed,
  WithdrawStatus.Withdrawable,
  WithdrawStatus.Withdrawed,
];

const WithdrawProgress: React.FC = () => {
  const { transactionHash: txnHash } = useParams<{ transactionHash: string }>();
  const {
    blocksUntilWithdrawable,
    firstFetching,
    targetL2Checkpoint,
    withdrawal,
    withdrawalStatus,
  } = useWithdrawStatus(txnHash);
  const theme = useTheme();
  const token = useToken(withdrawal?.tokenL1Address);
  const [withdrawed, setWithdrawed] = useState(false);
  const activeStep = steps.findIndex(cur =>
    withdrawed ? cur === WithdrawStatus.Withdrawed : cur === withdrawalStatus
  );
  const withdralInLS = useWithdrawInLS(txnHash);

  useEffect(() => {
    if (!withdrawal) {
      return;
    }

    if (withdralInLS && isWithdrawalDataComplete(withdralInLS)) {
      return;
    }

    saveWithdrawToStorage(withdrawal);
  }, [withdralInLS, withdrawal]);

  const onWithdrawed = useCallback(() => {
    setWithdrawed(true);
  }, []);

  return (
    <Box>
      <Breadcrumbs
        links={[
          { href: '/', name: 'home' },
          { href: '/transactions', name: 'transactions' },
          { name: 'withdrawal progress' },
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
        <Typography variant="h5">Withdrawal progress</Typography>
        {withdrawal && <TransferDirection from="l2" />}
        {token && (
          <TransferAmount
            amount={BigNumber.from(withdrawal?.amountOrTokenId)}
            from="l2"
            mb={5}
            token={token}
          />
        )}
        {withdrawalStatus !== WithdrawStatus.Unknown && (
          <ProgressStepper activeStep={activeStep} steps={steps} />
        )}
        {renderWithdrawalProgressContent({
          withdrawalStatus: withdrawalStatus || WithdrawStatus.Initiated,
          targetL2Checkpoint,
          withdrawal,
          blocksUntilWithdrawable,
          firstFetching,
          withdralInLS,
          onWithdrawed,
          withdrawed,
        })}
      </Container>
    </Box>
  );
};

export default WithdrawProgress;
