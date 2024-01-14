import type { CallOverrides } from '@ethersproject/contracts';
import type { TransactionResponse } from '@ethersproject/providers';

import { getAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers';
import { BigNumberish } from 'ethers';
import { formatUnits, parseUnits } from 'ethers';

import { CallError, ContractError, OutOfGasError, UserRejectError } from './errors';

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: string): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address?: string | null, chars = 4): string {
  if (!address) {
    return '';
  }

  const parsed = isAddress(address);

  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

// account is not optional
export function getSigner(library: JsonRpcProvider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: JsonRpcProvider,
  account?: string
): JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getContract(
  address: string,
  ABI: any,
  library: JsonRpcProvider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export async function getGasEstimate(
  contract: Contract,
  methodName: string,
  args?: any[],
  overrides?: CallOverrides
): Promise<BigNumber | OutOfGasError | CallError> {
  const gasEstimate = await contract.estimateGas[methodName](...(args ?? []), { ...overrides })
    .then(gasEstimate => {
      return gasEstimate;
    })
    .catch(gasError => {
      console.debug('Gas estimate failed, trying eth_call to extract error');

      return contract.callStatic[methodName](...(args ?? []), { ...overrides })
        .then(result => {
          console.debug('Unexpected successful call after failed estimate gas', gasError, result);

          return new OutOfGasError(methodName);
        })
        .catch((error: any) => {
          console.debug('Call threw error', error);

          return new CallError(
            methodName,
            'Call threw error',
            error?.error?.data?.originalError?.message ?? error?.data?.message
          );
        });
    });

  return gasEstimate;
}

export async function callMethod<T>(
  contract: Contract,
  methodName: string,
  args?: any[],
  overrides?: CallOverrides
): Promise<T> {
  const gasEstimate = await getGasEstimate(contract, methodName, args, overrides);

  if (gasEstimate instanceof Error) {
    throw gasEstimate;
  }

  return contract[methodName](...(args ?? []), {
    ...overrides,
    gasLimit: gasEstimate.mul(2),
  })
    .then((response: TransactionResponse) => {
      return response;
    })
    .catch((error: any) => {
      // if the user rejected the tx, pass this along
      if (error?.code === 4001) {
        throw new UserRejectError();
      } else {
        // otherwise, the error was unexpected and we need to convey that
        console.error(`${methodName} failed: ${error.message}`, error, methodName, args);
        throw new ContractError(methodName, `${methodName} failed: ${error.message}`);
      }
    });
}

export function formatDisplayUnits(
  balance: BigNumberish,
  decimals?: number,
  displayUnit = 3
): string {
  // Always return a '0' if it is exactly 0.
  if (BigNumber.from(balance).eq(BigNumber.from(0))) return '0';

  const value = formatUnits(balance, decimals);
  const [integral, fractional] = value.split('.');

  // further logic here to round a number
  if (decimals === 0 || displayUnit === 0) return integral;

  const displayFraction =
    fractional.length < displayUnit
      ? `${fractional + '0'.repeat(displayUnit - fractional.length)}`
      : fractional.length > displayUnit
      ? fractional.slice(0, displayUnit)
      : fractional;

  return trimZero(`${integral}.${displayFraction}`);
}

function trimZero(v: string) {
  const regexp = /(?:\.0*|(\.\d+?)0+)$/;

  return v.replace(regexp, '$1');
}

export function toFixed(n: string, decimals: number): string {
  const s = `${n}`.split('.');

  if (!s[1]) {
    return [s[0], '.'].concat(new Array(decimals).fill('0')).join('');
  }

  if (s[1].length < decimals) {
    return [s[0], '.', s[1]].concat(new Array(decimals - s[1].length).fill('0')).join('');
  }

  if (s[1].length > decimals) {
    return [s[0], '.'].concat(s[1].slice(0, decimals)).join('');
  }

  return `${n}`;
}

export function parseUnitsSafe(n: string, decimals: number): BigNumber {
  return BigNumber.from(parseUnits(toFixed(n, decimals), decimals));
}

export async function getBlockHash(blockNumber: number, rpcUrl: string) {
  const res = await fetch(rpcUrl, {
    method: 'POST',
    body: JSON.stringify({
      method: 'chain_getBlockHash',
      params: [blockNumber],
      id: 1,
      jsonrpc: '2.0',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = (await res.json()) as {
    jsonrpc: string;
    result: string;
    id: number;
  };

  return body.result;
}

export const getKey = (() => {
  const MIN = 0;
  const MAX = 100000;
  let index = MIN;
  const rounds: number[] = [0];

  return () => {
    if (index + 1 > MAX) {
      index = MIN;
      const lastRoundIndex = rounds.findIndex(round => round < 1000);

      if (lastRoundIndex < 0) {
        rounds.push(0);
      } else {
        rounds[lastRoundIndex] += 1;
      }
    }

    return `${++index}|${rounds.join('|')}`;
  };
})();

export function isNonnegativeNumber(target: string): boolean {
  return /^\d+(\.{0,1}\d+){0,1}$/.test(target);
}

export function getTimestampIsoString(timestamp?: number) {
  return new Date(timestamp ? timestamp * 1000 : new Date().getTime()).toISOString();
}

export function isTxHash(txHash: string): boolean {
  const regex = /^0x[0-9a-fA-F]{64}$/;

  return regex.test(txHash);
}

export async function asyncTryCatch<T>(
  func: (...args: any[]) => Promise<T>,
  ...args: any[]
): Promise<[Error, undefined] | [undefined, T]> {
  try {
    const value: T = await func(...args);

    return [undefined, value];
  } catch (e: any) {
    return [e, undefined];
  }
}
