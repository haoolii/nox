import { Box, Button, Typography } from '@mui/material';
import { utils } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import EnsureNetworkButton from '../../components/EnsureNetworkButton';
import TabFrame from '../../components/Layout/TabFrame';
import SwitchTransferDirection from '../../components/SwitchTransferDirection';
import { BridgeToken, TokenType, useConfig } from '../../contexts/ConfigContext';
import { useTokenBalance } from '../../contexts/TokenBalanceContext';
import useAmountBN from '../../hooks/useAmountBn';
import useAmountOrTokenIdValid from '../../hooks/useAmountOrTokenIdValid';
import From from '../Deposit/From';
import To from '../Deposit/To';
import WithdrawERC20Button from './WithdrawERC20Button';
import WithdrawERC721Button from './WithdrawERC721Button';
import WithdrawNativeButton from './WithdrawNativeButton';

const Withdraw: React.FC = () => {
  const { l2 } = useConfig();
  const [selectedToken, setToken] = useState<BridgeToken | null>(null);
  const [balance] = useTokenBalance(selectedToken, 'l2');
  const [{ amount: amountRaw, valid: exactValid }, setAmountRaw] = useState<{
    amount: string;
    valid: boolean;
  }>({ amount: '', valid: true });
  const amountBN = useAmountBN(amountRaw, selectedToken);
  const { errorMsg, valid } = useAmountOrTokenIdValid(
    amountRaw,
    amountBN,
    selectedToken,
    'l2',
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
        <Box>
          <From
            amountRaw={amountRaw}
            errorMsg={
              errorMsg ||
              (hasEnoughGas ? '' : 'Please ensure you have sufficient balance to pay for gas fee')
            }
            selectedToken={selectedToken}
            setAmountRaw={setAmountRaw}
            setToken={setToken}
            side="l2"
          />
          <SwitchTransferDirection />
          <To selectedToken={selectedToken} side="l1" />

          <EnsureNetworkButton fullWidth targetChainId={l2.id} variant="contained">
            {selectedToken?.type === TokenType.NATIVE ? (
              <WithdrawNativeButton
                amount={amountBN}
                token={selectedToken}
                valid={valid && hasEnoughGas}
              />
            ) : selectedToken?.type === TokenType.ERC20 ? (
              <WithdrawERC20Button amount={amountBN} token={selectedToken} valid={valid} />
            ) : selectedToken?.type === TokenType.ERC721 ? (
              <WithdrawERC721Button
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
        </Box>
      </TabFrame>
      <Link to="/transactions">
        <Typography color="secondary" mt={2} textAlign="center">
          View recent transactions
        </Typography>
      </Link>
    </>
  );
};

export default Withdraw;
