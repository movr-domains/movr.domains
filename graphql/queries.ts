import { gql } from "@apollo/client";

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
          name
          labelName
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
