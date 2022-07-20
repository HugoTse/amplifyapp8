/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGobj = /* GraphQL */ `
  mutation CreateGobj(
    $input: CreateGobjInput!
    $condition: ModelGobjConditionInput
  ) {
    createGobj(input: $input, condition: $condition) {
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
export const updateGobj = /* GraphQL */ `
  mutation UpdateGobj(
    $input: UpdateGobjInput!
    $condition: ModelGobjConditionInput
  ) {
    updateGobj(input: $input, condition: $condition) {
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
export const deleteGobj = /* GraphQL */ `
  mutation DeleteGobj(
    $input: DeleteGobjInput!
    $condition: ModelGobjConditionInput
  ) {
    deleteGobj(input: $input, condition: $condition) {
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
