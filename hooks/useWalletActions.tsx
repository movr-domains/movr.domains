import Web3Context from '@components/wallet/context';
import { ethers } from 'ethers';
import { useCallback, useContext, useEffect } from 'react';
import { web3Modal } from '@lib/providers';
import getName from '@lib/get-name';

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
      if (
        state.provider?.disconnect &&
        typeof state.provider.disconnect === 'function'
      ) {
        await state.provider.disconnect();
      }
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      });
      window.localStorage.removeItem('user');
    },
    [state?.provider, dispatch]
  );

  const switchChainIds = useCallback(async function () {
    console.log(web3Modal);
  }, []);

  return { connect, disconnect, switchChainIds };
}
