import { gql } from "@apollo/client";

export const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
      id
      title
      completed
    }
  }
`;

export const CREATE_TODO = gql`
  mutation updateTodo($input: CreateTodoInput!) {
    updateTodo(input: $input) {
      id
      title
      completed
    }
  }
`;
