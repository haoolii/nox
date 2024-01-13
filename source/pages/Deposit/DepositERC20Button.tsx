import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider';
import LoadingButton from '@mui/lab/LoadingButton';
import { BigNumber } from 'ethers';
import React from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAccount, useSigner } from 'wagmi';

import { BridgeToken, useConfig } from '../../contexts/ConfigContext';
import { L1Bridge } from '../../core/Bridge';
import { addDeposit, saveDepositToStorage } from '../../core/storage/deposit';
import { getTimestampIsoString } from '../../core/utils';
import useAlertTransaction from '../../hooks/useAlertTransaction';
import { useApprove } from '../../hooks/useApprove';

const DepositERC20Button: React.FC<{ amount: BigNumber; token: BridgeToken; valid?: boolean }> = ({
  amount,
  token,
  valid,
}) => {
  const signer = useSigner();
  const { address } = useAccount();
  const { l1 } = useConfig();
  const navigate = useNavigate();
  const { alertConfirmed, alertFailed } = useAlertTransaction('l1');
  const { approve, isApproved } = useApprove(
    token.l1Address,
    address,
    l1.bridgeAddress,
    amount,
    'l1'
  );

  const { isLoading: isApproveLoading, mutate: approveMutate } = useMutation<
    TransactionResponse | undefined,
    any,
    void
  >({
    mutationFn: async () => {
      // setConfirmModalShow(true);
      return await approve();
      // setConfirmModalShow(false);
    },
    onSuccess(data) {
      data && alertConfirmed(data.hash);
    },
    onError(e) {
      console.error(e);
      alertFailed(e.message);
    },
  });

  const { isLoading, mutate: depositERC20 } = useMutation<
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
      if (!signer.data || !signer.isSuccess || !address) {
        return;
      }

      const bridge = new L1Bridge(l1.bridgeAddress, signer.data);
      const txResponse = await bridge.depositERC20(token.l1Address, address, amount);

      saveDepositToStorage({
        blockNumber: txResponse.blockNumber,
        transactionHash: txResponse.hash,
        from: address,
        amountOrTokenId: amount.toString(),
        tokenL1Address: token.l1Address,
        timestamp: getTimestampIsoString(txResponse.timestamp),
      });
      const receipt = await txResponse.wait();

      return { address, receipt, amount, l1Address: token.l1Address };
    },
    onSuccess(data) {
      if (!data) {
        return;
      }

      const { address, amount, l1Address, receipt } = data;
      const hash = receipt.transactionHash;

      alertConfirmed(hash);

      try {
        addDeposit({
          txReceipt: receipt,
          amountOrTokenId: amount,
          tokenL1Address: l1Address,
          account: address,
          transactionHash: hash,
        });
        navigate(`/deposit/progress/${hash}`);
      } catch (e) {
        console.error(e);
      }
    },
    onError(e) {
      console.error(e);
      alertFailed(e.message);
    },
  });

  if (!isApproved && valid) {
    return (
      <LoadingButton
        fullWidth
        loading={isApproveLoading}
        onClick={() => approveMutate()}
        variant="contained"
      >
        Approve
      </LoadingButton>
    );
  }

  return (
    <LoadingButton
      disabled={!valid}
      fullWidth
      loading={isLoading}
      onClick={() => depositERC20()}
      variant="contained"
    >
      Deposit
    </LoadingButton>
  );
};

export default DepositERC20Button;
