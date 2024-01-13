import { LoadingButton } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useSigner } from 'wagmi';

import EnsureNetworkButton from '../../components/EnsureNetworkButton';
import { useConfig } from '../../contexts/ConfigContext';
import { L1Bridge, L2Bridge } from '../../core/Bridge';
import { Withdraw } from '../../core/storage/withdraw';
import { getBlockHash } from '../../core/utils';
import useAlertTransaction from '../../hooks/useAlertTransaction';
import { useStaticProvider } from '../../hooks/useStaticProvider';

const FinalizeWithdrawButton: React.FC<{
  withdraw: Withdraw | null;
  targetL2Checkpoint: number | undefined;
  onWithdrawed?: () => void;
}> = ({ onWithdrawed, targetL2Checkpoint, withdraw }) => {
  const { l1, l2 } = useConfig();
  const signer = useSigner();
  const [headerHash, setHeaderHash] = useState<string>();
  const [withdrawRoot, setWithdrawRoot] = useState<string>();
  const [withdrawProof, setWithdrawProof] = useState<string>();
  const l2Provider = useStaticProvider('l2');
  const { alertConfirmed, alertFailed } = useAlertTransaction('l1');

  useEffect(() => {
    if (!targetL2Checkpoint || !withdraw || !withdraw.withdrawalHash || !withdraw.blockNumber) {
      return;
    }

    const l2Bridge = new L2Bridge(l2.bridgeAddress, l2Provider);

    Promise.all([
      getBlockHash(targetL2Checkpoint, l2.rpcUrls.default.http[0]),
      l2Bridge.withdrawProof(withdraw.withdrawalHash, withdraw.blockNumber),
      l2Bridge.withdrawRoot(targetL2Checkpoint),
    ]).then(([headerHash, withdrawProof, withdrawRoot]) => {
      setHeaderHash(headerHash);
      setWithdrawProof(withdrawProof);
      setWithdrawRoot(withdrawRoot);
    });
  }, [targetL2Checkpoint, l2.bridgeAddress, l2.rpcUrls.default.http, l2Provider, withdraw]);

  const { isLoading, mutate: finalize } = useMutation<string, any, void>({
    mutationFn: async () => {
      if (
        !headerHash ||
        !signer.data ||
        !signer.isSuccess ||
        !withdraw ||
        !targetL2Checkpoint ||
        !withdrawProof ||
        !withdrawRoot ||
        !withdraw.message
      ) {
        throw new Error('Arguments are not valid');
      }

      const bridge = new L1Bridge(l1.bridgeAddress, signer.data);
      const txResponse = await bridge.finalizeWithdraw(
        targetL2Checkpoint,
        headerHash,
        withdrawRoot,
        withdrawProof,
        withdraw.message
      );
      const receipt = await txResponse.wait();

      onWithdrawed?.();

      return receipt.transactionHash;
    },
    onSuccess(hash) {
      alertConfirmed(hash);
    },
    onError(e) {
      console.error(e);
      alertFailed(e.message);
    },
  });

  return (
    <EnsureNetworkButton fullWidth targetChainId={l1.id} variant="contained">
      <LoadingButton
        disabled={
          !headerHash ||
          !signer.data ||
          !signer.isSuccess ||
          !withdraw ||
          !targetL2Checkpoint ||
          !withdrawProof ||
          !withdrawRoot ||
          !withdraw.message
        }
        fullWidth
        loading={isLoading}
        onClick={() => finalize()}
        sx={{ textTransform: 'none' }}
        variant="contained"
      >
        Finalize Withdrawal
      </LoadingButton>
    </EnsureNetworkButton>
  );
};

export default FinalizeWithdrawButton;
