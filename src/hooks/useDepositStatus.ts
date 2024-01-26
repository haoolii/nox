import { loadDeposit } from "../core/loadDeposit";
import { DepositData } from "../core/type";
import { useL2Bridge } from "./useBridge";
import { useNativeTokenConfig } from "./useNativeTokenConfig";
import { useStaticProvider } from "./useStaticProvider";

export enum DepositStatus {
  Unknown = "Unknown",
  Initiated = "Initiated",
  Finalized = "Finalized",
}

export const useDepositStatus = async (
  txHash: string | undefined
): Promise<
  {
    status: DepositStatus;
    deposit: DepositData | null;
  } & any
> => {
  const l1Provider = useStaticProvider("l1");
  const l2Bridge = useL2Bridge();
  const nativeToken = useNativeTokenConfig();
  const deposit = await loadDeposit(l1Provider, txHash, nativeToken.l1Address);
  const finalized = await l2Bridge.depositFinalized(deposit.message);

  if (isUndefined(finalized)) {
    return {
      status: DepositStatus.Unknown,
      deposit,
    };
  }

  if (finalized) {
    return {
      status: DepositStatus.Finalized,
      deposit,
    };
  }

  return {
    status: DepositStatus.Initiated,
    deposit,
  };
};

function isUndefined(...values: any[]): boolean {
  return !values.every((value) => value !== undefined);
}
