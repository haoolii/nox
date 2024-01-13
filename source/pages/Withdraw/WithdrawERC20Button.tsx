import { TransactionReceipt } from '@ethersproject/abstract-provider';
import LoadingButton from '@mui/lab/LoadingButton';
import { BigNumber } from 'ethers';
import React from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAccount, useSigner } from 'wagmi';

import { BridgeToken, useConfig } from '../../contexts/ConfigContext';
import { L2Bridge } from '../../core/Bridge';
import { addWithdraw, saveWithdrawToStorage } from '../../core/storage/withdraw';
import { getTimestampIsoString } from '../../core/utils';
import useAlertTransaction from '../../hooks/useAlertTransaction';

const WithdrawERC20Button: React.FC<{
  valid?: boolean;
  amount: BigNumber;
  token: BridgeToken;
}> = ({ amount, token, valid }) => {
  const signer = useSigner();
  const { address } = useAccount();
  const { l2 } = useConfig();
  const navigate = useNavigate();
  const { alertConfirmed, alertFailed } = useAlertTransaction('l2');

  const { isLoading, mutate: withdrawERC20 } = useMutation<
    | {
        receipt: TransactionReceipt;
        address: string;
        amount: BigNumber;
        l1Address: string;
      }
    | undefined,
    any,
    void
  >({
    mutationFn: async () => {
      if (!signer.data || !signer.isSuccess || !address) return;

      const bridge = new L2Bridge(l2.bridgeAddress, signer.data);
      const txResponse = await bridge.withdrawERC20(token.l2Address, address, amount);

      saveWithdrawToStorage({
        blockNumber: txResponse.blockNumber,
        transactionHash: txResponse.hash,
        from: address,
        amountOrTokenId: amount.toString(),
        tokenL1Address: token.l1Address,
        timestamp: getTimestampIsoString(txResponse.timestamp),
      });
      const receipt = await txResponse.wait();

      return { address, receipt, l1Address: token.l1Address, amount };
    },
    onSuccess(data) {
      if (!data) {
        return;
      }

      const { address, amount, l1Address, receipt } = data;
      const hash = receipt.transactionHash;

      alertConfirmed(hash);

      try {
        addWithdraw({
          txReceipt: receipt,
          amountOrTokenId: amount,
          tokenL1Address: l1Address,
          account: address,
          transactionHash: hash,
        });
        navigate(`/withdraw/progress/${hash}`);
      } catch (e) {
        console.error('parse error', e);
      }
    },
    onError(e) {
      console.error(e);
      alertFailed(e.message);
    },
  });

  return (
    <LoadingButton
      disabled={!valid}
      fullWidth
      loading={isLoading}
      onClick={() => withdrawERC20()}
      variant="contained"
    >
      Withdraw
    </LoadingButton>
  );
};

export default WithdrawERC20Button;
