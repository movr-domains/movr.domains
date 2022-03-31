import useWalletActions from '@hooks/useWalletActions';
import React, { useContext, useEffect, useReducer } from 'react';
import Web3Context, { web3InitialState, web3Reducer } from './context';
import { web3Modal } from '@lib/providers';

interface WalletProviderProps {
  children: React.ReactChild;
}

interface WalletStateProps {
  state: any;
  dispatch: any;
}

export default function WalletProvider({ children }: WalletProviderProps) {
  const [state, dispatch] = useReducer(web3Reducer, web3InitialState);
  return (
    <Web3Context.Provider value={{ state, dispatch }}>
      <WalletState>{children}</WalletState>
    </Web3Context.Provider>
  );
}

function WalletState({ children }: { children: React.ReactChild }) {
  const { state, dispatch } = useContext<WalletStateProps>(Web3Context);
  const { connect, disconnect } = useWalletActions();

  useEffect(() => {
    if (state?.provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        });
        if (accounts[0]) {
          window.localStorage.setItem('user', accounts[0].toLowerCase());
        }
      };

      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload();
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        console.log('disconnect', error);
        window.localStorage.removeItem('user');
        disconnect();
      };

      state.provider.on('accountsChanged', handleAccountsChanged);
      state.provider.on('chainChanged', handleChainChanged);
      state.provider.on('disconnect', handleDisconnect);

      return () => {
        if (state.provider.removeListener) {
          state.provider.removeListener(
            'accountsChanged',
            handleAccountsChanged
          );
          state.provider.removeListener('chainChanged', handleChainChanged);
          state.provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, [state, disconnect, dispatch]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  useEffect(() => {
    dispatch({
      type: 'SET_ADDRESS',
      address: window.localStorage.getItem('user'),
    });
  }, [dispatch]);

  return <React.Fragment>{children}</React.Fragment>;
}
