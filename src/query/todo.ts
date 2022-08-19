import { gql } from "@apollo/client";

export const GET_ALL_TODO = gql`
  query ($options: PageQueryOptions) {
    todos(options: $options) {
      data {
        id
        title
        completed
      }
      meta {
        totalCount
      }
    }
  }
`;

export const GET_ONE_TODO = gql`
  query ($id: ID) {
    todo(id: $id) {
      id
      title
      completed
    }
  }
`;
