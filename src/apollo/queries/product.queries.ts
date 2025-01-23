import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    getAllProduct {
      id
      name
      description
      price
      stock
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: AddProductInput!) {
    addProduct(input: $input) {
      id
      name
      description
      price
      stock
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      id
      name
      description
      price
      stock
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
