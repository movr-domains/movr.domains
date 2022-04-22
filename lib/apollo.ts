import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/natelook/mdr-moonbase-alpha',
  cache: new InMemoryCache(),
});

export default client;
