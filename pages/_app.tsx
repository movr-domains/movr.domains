import '../styles/globals.css';
import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import type {
  ExternalProvider,
  JsonRpcFetchFunc,
} from '@ethersproject/providers';
import { Web3Provider } from '@ethersproject/providers';
import { Layout } from '@components/ui';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@lib/apollo';
import WalletProvider from '@components/wallet/provider';
import Meta from '@components/ui/header/meta';

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  const library = new Web3Provider(provider);

  return library;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletProvider>
        <ApolloProvider client={client}>
          <Layout>
            <React.Fragment>
              <Meta />
              <Component {...pageProps} />
            </React.Fragment>
          </Layout>
        </ApolloProvider>
      </WalletProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
