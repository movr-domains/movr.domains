import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

export const moonbaseProvider = new ethers.providers.StaticJsonRpcProvider(
  'https://rpc.api.moonbase.moonbeam.network',
  {
    chainId: 1287,
    name: 'moonbase-alphanet',
  }
);

export const moonbeamDevProvider = new ethers.providers.StaticJsonRpcProvider(
  'https://rpc.api.moonbase.moonbeam.network',
  {
    chainId: 1281,
    name: 'moonbeam-dev-node',
  }
);

export let web3Modal: any;
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: {},
    theme: 'dark',
  });
}
