import { JsonRpcProvider } from '@ethersproject/providers';
import { useConfig } from "./useConfig";

export const useStaticProvider = (side: "l1" | "l2") => {
  const { l1, l2 } = useConfig();

  return new JsonRpcProvider(
    side === "l1" ? l1.rpcUrls.default.http[0] : l2.rpcUrls.default.http[0],
    side === "l1"
      ? { chainId: l1.id, name: l1.name }
      : { chainId: l2.id, name: l2.name }
  );
};
