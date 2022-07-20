/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGobj = /* GraphQL */ `
  query GetGobj($id: ID!) {
    getGobj(id: $id) {
      id
      customer
      service
      claim
      winloss
      priority
      serviceteam
      description
      createdAt
      updatedAt
    }
  }
`;
export const listGobjs = /* GraphQL */ `
  query ListGobjs(
    $filter: ModelGobjFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGobjs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        customer
        service
        claim
        winloss
        priority
        serviceteam
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
