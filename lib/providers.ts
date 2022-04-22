import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

const moonbaseProvider = new ethers.providers.StaticJsonRpcProvider(
  'https://rpc.api.moonbase.moonbeam.network',
  {
    chainId: 1287,
    name: 'moonbase-alphanet',
  }
);

const moonbeamDevProvider = new ethers.providers.StaticJsonRpcProvider(
  'http://127.0.0.1:9933',
  {
    chainId: 1281,
    name: 'moonbeam-dev-node',
  }
);

export default function getProvider() {
  const network = process.env.NETWORK;
  console.log({ network });
  if (network === 'LOCAL') {
    return moonbeamDevProvider;
  } else if (network === 'TESTNET') {
    return moonbaseProvider;
  } else {
    return null;
  }
}

export let web3Modal: any;
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: {},
    theme: 'dark',
  });
}
