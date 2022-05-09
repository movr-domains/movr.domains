import Web3Context from '@components/wallet/context';
import { ethers } from 'ethers';
import { useCallback, useContext } from 'react';
import { web3Modal } from '@lib/providers';
import { getName } from '@lib/contract';

export default function useWalletActions() {
  const { state, dispatch } = useContext(Web3Context);

  const connect = useCallback(
    async function () {
      const provider = await web3Modal.connect();

      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      if (!signer) {
        console.log('there is no signer');
      }
      const address = await signer.getAddress();
      const network = await web3Provider.getNetwork();

      // check for .movr name
      const movrName = await getName(address);

      dispatch({
        type: 'SET_WEB3_PROVIDER',
        provider,
        web3Provider,
        address: address.toLowerCase(),
        chainId: network.chainId,
        movrName,
      });
      window.localStorage.setItem('user', address.toLowerCase());
    },
    [dispatch]
  );

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      window.localStorage.removeItem('user');

      if (
        state.provider?.disconnect &&
        typeof state.provider.disconnect === 'function'
      ) {
        await state.provider.disconnect();
      }
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      });
    },
    [state?.provider, dispatch]
  );

  const switchChainIds = useCallback(
    async function () {
      const chainId = process.env.CHAIN_ID!;
      const chainHex = ethers.utils.hexValue(parseInt(chainId));

      try {
        await state.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainHex }],
        });
      } catch (switchError: any) {
        console.log(switchError.code);
        if (switchError.code === 4902) {
          try {
            await state.provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: chainHex,
                  chainName:
                    parseInt(chainId) == 1285
                      ? 'Moonriver'
                      : parseInt(chainId) == 1287
                      ? 'Moonbase Alpha'
                      : 'Moonbase Dev',

                  rpcUrls:
                    parseInt(chainId) == 1285
                      ? ['https://rpc.api.moonbase.moonbeam.network']
                      : parseInt(chainId) == 1287
                      ? ['https://rpc.api.moonbase.moonbeam.network']
                      : ['http://127.0.0.1:9933'],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
      }
    },
    [state.provider]
  );

  return { connect, disconnect, switchChainIds };
}
