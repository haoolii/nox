import { Button, Typography } from '@mui/material';
import { utils } from 'ethers';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import EnsureNetworkButton from '../../components/EnsureNetworkButton';
import TabFrame from '../../components/Layout/TabFrame';
import SwitchTransferDirection from '../../components/SwitchTransferDirection';
import { BridgeToken, TokenType, useConfig } from '../../contexts/ConfigContext';
import { useTokenBalance } from '../../contexts/TokenBalanceContext';
import useAmountBN from '../../hooks/useAmountBn';
import useAmountOrTokenIdValid from '../../hooks/useAmountOrTokenIdValid';
import DepositERC20Button from './DepositERC20Button';
import DepositERC721Button from './DepositERC721Button';
import DepositNativeButton from './DepositNativeButton';
import From from './From';
import To from './To';

const Deposit: React.FC = () => {
  const { l1 } = useConfig();
  const [selectedToken, setToken] = useState<BridgeToken | null>(null);
  const [balance] = useTokenBalance(selectedToken, 'l1');
  const [{ amount: amountRaw, valid: exactValid }, setAmountRaw] = useState<{
    amount: string;
    valid: boolean;
  }>({ amount: '', valid: true });
  const amountBN = useAmountBN(amountRaw, selectedToken);
  const { errorMsg, valid } = useAmountOrTokenIdValid(
    amountRaw,
    amountBN,
    selectedToken,
    'l1',
    exactValid
  );
  const hasEnoughGas = useMemo(
    () =>
      !selectedToken?.type ||
      selectedToken?.type !== TokenType.NATIVE ||
      !balance ||
      balance.gte(amountBN.add(utils.parseEther('0.001'))),
    [amountBN, balance, selectedToken?.type]
  );

  useEffect(() => {
    selectedToken && setAmountRaw({ amount: '', valid: true });
  }, [selectedToken]);

  return (
    <>
      <TabFrame>
        <From
          amountRaw={amountRaw}
          errorMsg={
            errorMsg ||
            (hasEnoughGas ? '' : 'Please ensure you have sufficient balance to pay for gas fee')
          }
          selectedToken={selectedToken}
          setAmountRaw={setAmountRaw}
          setToken={setToken}
          side="l1"
        />
        <SwitchTransferDirection />
        <To selectedToken={selectedToken} side="l2" />
        <EnsureNetworkButton fullWidth targetChainId={l1.id} variant="contained">
          {selectedToken?.type === TokenType.NATIVE ? (
            <DepositNativeButton
              amount={amountBN}
              token={selectedToken}
              valid={valid && hasEnoughGas}
            />
          ) : selectedToken?.type === TokenType.ERC20 ? (
            <DepositERC20Button amount={amountBN} token={selectedToken} valid={valid} />
          ) : selectedToken?.type === TokenType.ERC721 ? (
            <DepositERC721Button
              token={selectedToken}
              tokenId={parseInt(amountRaw)}
              valid={valid}
            />
          ) : null}
          {!selectedToken && (
            <Button disabled fullWidth variant="contained">
              Select a token
            </Button>
          )}
        </EnsureNetworkButton>
      </TabFrame>
      <Link to="/transactions">
        <Typography color="secondary" mt={2} textAlign="center">
          View recent transactions
        </Typography>
      </Link>
    </>
  );
};

export default Deposit;
