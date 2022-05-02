import { gql } from '@apollo/client';

export const GET_ACCOUNT_DOMAINS = gql`
  query GetUsersDomains(
    $account: ID!
    $orderBy: Registration_orderBy = labelName
    $orderDirection: OrderDirection = asc
  ) {
    account(id: $account, subgraphError: allow) {
      registrations(orderBy: $orderBy, orderDirection: $orderDirection) {
        id
        domain {
          id
          name
          labelName
          labelhash
        }
        expiryDate
      }
    }
  }
`;

export const GET_ALL_DOMAINS = gql`
  query GetAllDomains($perPage: Int = 20) {
    registrationEvents(
      subgraphError: allow
      first: $perPage
      orderBy: blockNumber
      orderDirection: desc
    ) {
      id
      transactionID
      registration {
        domain {
          name
          labelName
          owner {
            id
          }
        }
        registrationDate
        cost
        expiryDate
      }
    }
  }
`;

export const GET_DOMAIN_WITH_RESOLVER = gql`
  query getDomainWithResolver($id: String!) {
    domain(id: $id, subgraphError: allow) {
      id
      name
      labelhash
      labelName
      parent {
        id
        name
      }
      resolvedAddress {
        id
      }
      owner {
        id
        registrations(where: { domain: $id }) {
          id
          registrationDate
          cost
          expiryDate
          labelName
        }
      }
      resolver {
        id
        texts
        address
      }
    }
  }
`;

export const GET_REGISTRATION = gql`
  query getRegistration($id: String!) {
    registrations(where: { domain: $id }) {
      labelName
      id
      registrant {
        id
      }
      expiryDate
      domain {
        id
        parent {
          id
          owner {
            id
          }
        }
        owner {
          id
        }
      }
    }
  }
`;

export const GET_DOMAIN = gql`
  query getDomain($tokenId: String!) {
    registrations(first: 1, where: { domain: $tokenId }) {
      domain {
        id
        name
        labelhash
        name
        labelName
        resolver {
          texts
        }
      }
      registrationDate
      expiryDate
    }
  }
`;
const MOVR_HASH =
  '0x05cfa4aed0f16a8d4c0deadce4fe8bdae5bc69823c3814567bead46734d26cd2';

export const GET_DOMAINS_BY_LABELHASH = gql`
  query getDomains($tokenId: String) {
    domains(
      where: {
        parent: "${MOVR_HASH}",
        labelhash: $tokenId
      }
    ) {
      id
      labelhash
      name
      parent {
        id
      }
      resolver {
        texts
      }
    }
  }
`;
export const GET_RESOLVER_BY_ID = gql`
  query getResolverById($id: String!) {
    resolvers(first: 5, where: { domain: $id }) {
      id
      texts
    }
  }
`;
