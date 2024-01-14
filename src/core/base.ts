import type { BigNumber } from '@ethersproject/bignumber';

import { Signer } from '@ethersproject/abstract-signer';
import { Contract, ContractFunction, ContractInterface } from '@ethersproject/contracts';
import { JsonRpcProvider, Provider } from '@ethersproject/providers';

export abstract class BaseContract {
  public contract: Contract;
  public abi: ContractInterface;
  public signerOrProvider: Signer | Provider;

  public address: string;

  constructor(address: string, signerOrProvider: Signer | Provider, abi: ContractInterface) {
    this.address = address;
    this.abi = abi;
    this.signerOrProvider = signerOrProvider;
    this.contract = new Contract(address, abi, signerOrProvider);
  }

  get estimateGas(): { [name: string]: ContractFunction<BigNumber> } {
    return this.contract.estimateGas;
  }

  get signer(): Signer | null {
    return this.signerOrProvider instanceof Signer
      ? this.signerOrProvider
      : this.signerOrProvider instanceof JsonRpcProvider
      ? this.signerOrProvider.getSigner()
      : null;
  }
}
