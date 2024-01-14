import { Address } from "./type";

export enum TokenType {
  ERC20 = "erc20",
  ERC721 = "erc721",
  NATIVE = "native",
}

export type BridgeToken = {
  l1Address: Address;
  l2Address: Address;
  name: string;
  symbol: string;
  decimals: number;
  type: TokenType;
};
