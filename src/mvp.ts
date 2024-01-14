import { JsonRpcProvider, ethers } from "ethers";
import { useConfig } from "./hooks/useConfig";
import * as abis from "./core/abis";
import { useStaticProvider } from "./hooks/useStaticProvider";
import { useNativeTokenConfig } from "./hooks/useNativeTokenConfig";
import { getBlockHash } from "./core/utils";
import { loadWithdrawal } from "./core/loadWithdrawal";
import { L1Bridge } from "./core/Bridge";
import { useL1Bridge, useL2Bridge } from "./hooks/useBridge";

const walletInfo = {
  address: process.env.WALLET_ADDRESS,
  privateKey: process.env.PRIVATE_KEY,
};
const deposit = async () => {
  console.log("==== MVP Deposit Start ====");
  const { l1 } = useConfig();

  // RPC URL
  const rpcUrl = l1.rpcUrls.default.http[0];

  // Private Key
  const privateKey = walletInfo.privateKey;

  // Use RPC provider connect to node
  const provider = new JsonRpcProvider(rpcUrl);

  // Create sign wallet
  const wallet = new ethers.Wallet(privateKey, provider);

  // Create contract interface
  const contract = new ethers.Contract(
    l1.bridgeAddress,
    abis.L1BridgeAbi,
    wallet
  );

  const functionName = "depositNative";

  const param1 = walletInfo.address;

  const param2 = "10000000000000000"; // 0.01

  const transaction = await contract[functionName](param1, { value: param2 });

  // await transaction.wait();

  console.log("Transaction Hash:", transaction);

  console.log("==== MVP Deposit End ====");
};

const withdraw = async () => {
  console.log("==== MVP Withdraw Start ====");
  const { l2 } = useConfig();

  // RPC URL
  const rpcUrl = l2.rpcUrls.default.http[0];

  // Private Key
  const privateKey = walletInfo.privateKey;

  // Use RPC provider connect to node
  const provider = new JsonRpcProvider(rpcUrl);

  // Create sign wallet
  const wallet = new ethers.Wallet(privateKey, provider);

  // Create contract interface
  const contract = new ethers.Contract(
    l2.bridgeAddress,
    abis.L2BridgeAbi,
    wallet
  );

  const functionName = "withdrawNative";

  const param1 = walletInfo.address;

  const param2 = "10000000000000000"; // 0.01

  const transaction = await contract[functionName](param1, param2);

  // await transaction.wait();

  console.log("Transaction Hash:", transaction);

  console.log("==== MVP Withdraw End ====");
};

const finalizeWithdraw = async () => {
  console.log("==== MVP Finalize Withdraw Start ====");
  const l1Provider = useStaticProvider('l1');
  const l2Provider = useStaticProvider('l2');
  const nativeToken = useNativeTokenConfig();
  const { l1, l2 } = useConfig();

  // RPC URL
  const rpcUrl = l2.rpcUrls.default.http[0];

  // Private Key
  const privateKey = walletInfo.privateKey;

  // Use RPC provider connect to node
  const provider = new JsonRpcProvider(rpcUrl);

  // Create sign wallet
  const wallet = new ethers.Wallet(privateKey, provider);

  // Create sign wallet
  const rpcUrlL1 = l1.rpcUrls.default.http[0];
  const providerL1 = new JsonRpcProvider(rpcUrlL1);
  const walletL1 = new ethers.Wallet(privateKey, providerL1);

  // Create contract interface
  const contract = new ethers.Contract(
    l2.bridgeAddress,
    abis.L2BridgeAbi,
    wallet
  );
  const txHash = '0xadb2b33ac52677f47970d244ced462f5b3d18d64ba7fb9a9e87373f069cfb2a9';
  const { blockNumber } = await l2Provider.getTransactionReceipt(txHash);
  // console.log('blockNumber', blockNumber)
  const checkpoint = Number(await contract.blockCheckpoint(blockNumber));
  // console.log('checkpoint: ', checkpoint)
  const headerHash = await getBlockHash(checkpoint, l2.rpcUrls.default.http[0]);
  // console.log('headerHash: ', headerHash)
  const withdrawRoot = await contract.withdrawRoot(checkpoint);
  // console.log('withdrawRoot: ', withdrawRoot)
  // console.log('nativeToken', nativeToken)
  const withdraw = await loadWithdrawal(l2Provider, txHash, nativeToken?.l1Address);
  // console.log('withdraw', withdraw)
  const l2Bridge = useL2Bridge()
  const withdrawProof = await l2Bridge.withdrawProof(withdraw.withdrawalHash, withdraw.blockNumber);
  // console.log('withdrawProof', withdrawProof);
  const withdrawMessage = withdraw.message;
  console.log('withdrawMessage', withdrawMessage)
  console.log({
    checkpoint,
    headerHash,
    withdrawRoot,
    withdrawProof,
    withdrawMessage,
  })
  const contractL1 = new ethers.Contract(
    l1.bridgeAddress,
    abis.L1BridgeAbi,
    walletL1
  );
  
  // const txResponse = await contractL1['finalizeWithdraw'](
  //   checkpoint,
  //   headerHash,
  //   withdrawRoot,
  //   withdrawProof,
  //   withdrawMessage,
  // );
  // wallet.
  const bridge = useL1Bridge();
  // const bridge = new L1Bridge(l1.bridgeAddress, l1Provider.getSigner());
  const txResponse = await bridge.finalizeWithdraw(
    checkpoint,
    headerHash,
    withdrawRoot,
    withdrawProof,
    withdraw.message
  );
  console.log('txResponse', txResponse)
  // const receipt = await txResponse.wait();
  //   console.log('receipt', receipt)
  console.log("==== MVP Finalize Withdraw End ====");
}



export const execute = async () => {
  console.log("MVP");
  // await deposit();

  await finalizeWithdraw();
};
