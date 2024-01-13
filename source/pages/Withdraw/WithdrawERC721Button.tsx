import { TransactionReceipt } from '@ethersproject/abstract-provider';
import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useMutation, useSigner } from 'wagmi';

import { BridgeToken, useConfig } from '../../contexts/ConfigContext';
import { L2Bridge } from '../../core/Bridge';
import { addWithdraw, saveWithdrawToStorage } from '../../core/storage/withdraw';
import { getTimestampIsoString } from '../../core/utils';
import useAlertTransaction from '../../hooks/useAlertTransaction';

const WithdrawERC721Button: React.FC<{ valid?: boolean; tokenId: number; token: BridgeToken }> = ({
  token,
  tokenId,
  valid,
}) => {
  const { address } = useAccount();
  const signer = useSigner();
  const { l2 } = useConfig();
  const navigate = useNavigate();
  const { alertConfirmed, alertFailed } = useAlertTransaction('l2');

  const { isLoading, mutate: withdrawERC721 } = useMutation<
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

      const bridge = new L2Bridge(l2.bridgeAddress, signer.data);

      const txResponse = await bridge.withdrawERC721(token.l2Address, address, tokenId);

      saveWithdrawToStorage({
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
        addWithdraw({
          txReceipt: receipt,
          amountOrTokenId: tokenId,
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
      onClick={() => withdrawERC721()}
      variant="contained"
    >
      Withdraw
    </LoadingButton>
  );
};

export default WithdrawERC721Button;
