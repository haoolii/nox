import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider';
import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useMutation, useSigner } from 'wagmi';

import { BridgeToken, useConfig } from '../../contexts/ConfigContext';
import { L1Bridge } from '../../core/Bridge';
import { addDeposit, saveDepositToStorage } from '../../core/storage/deposit';
import { getTimestampIsoString } from '../../core/utils';
import useAlertTransaction from '../../hooks/useAlertTransaction';
import { useApprovalForAll } from '../../hooks/useApprovalForAll';

const DepositERC721Button: React.FC<{ tokenId: number; token: BridgeToken; valid?: boolean }> = ({
  token,
  tokenId,
  valid,
}) => {
  const { address } = useAccount();
  const signer = useSigner();
  const { l1 } = useConfig();
  const { alertConfirmed, alertFailed } = useAlertTransaction('l1');
  const navigate = useNavigate();
  const { isApprovalForAll, setApprovalForAll } = useApprovalForAll(
    token.l1Address,
    address,
    l1.bridgeAddress,
    true
  );

  const { isLoading: isApproveLoading, mutate: approveMutate } = useMutation<
    TransactionResponse | undefined,
    any,
    void
  >({
    mutationFn: async () => {
      // setConfirmModalShow(true);
      return await setApprovalForAll();
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

  const { isLoading, mutate: depositERC721 } = useMutation<
    | {
        receipt: TransactionReceipt;
        address: string;
        tokenId: number;
        l1Address: string;
      }
    | undefined,
    any,
    void
  >({
    mutationFn: async () => {
      if (!signer.data || !signer.isSuccess || !address) return;

      const bridge = new L1Bridge(l1.bridgeAddress, signer.data);
      const txResponse = await bridge.depositERC721(token.l1Address, address, tokenId);

      saveDepositToStorage({
        blockNumber: txResponse.blockNumber,
        transactionHash: txResponse.hash,
        from: address,
        amountOrTokenId: tokenId.toString(),
        tokenL1Address: token.l1Address,
        timestamp: getTimestampIsoString(txResponse.timestamp),
      });
      const receipt = await txResponse.wait();

      return { address, receipt, tokenId, l1Address: token.l1Address };
    },
    onSuccess(data) {
      if (!data) {
        return;
      }

      const { address, l1Address, receipt, tokenId } = data;
      const hash = receipt.transactionHash;

      alertConfirmed(hash);

      try {
        addDeposit({
          txReceipt: receipt,
          amountOrTokenId: tokenId,
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

  if (!isApprovalForAll && valid) {
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
      onClick={() => depositERC721()}
      variant="contained"
    >
      Deposit
    </LoadingButton>
  );
};

export default DepositERC721Button;
