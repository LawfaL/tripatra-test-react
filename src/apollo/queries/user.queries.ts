import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    getAllUser {
      id
      name
      email
      createdAt
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: RegisterInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
