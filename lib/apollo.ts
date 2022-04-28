import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:
    process.env.NETWORK === 'TESTNET'
      ? 'https://api.thegraph.com/subgraphs/name/natelook/mdr-moonbase-alpha'
      : 'http://127.0.0.1:8000/subgraphs/name/mdr/movr-domains',
  cache: new InMemoryCache(),
});

export default client;
