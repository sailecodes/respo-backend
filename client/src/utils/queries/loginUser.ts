import { gql } from "@apollo/client";

export const loginUser = gql`
  mutation LoginUser($username: String!, $password: String!) {
    data: loginUser(loginUserInput: { username: $username, password: $password }) {
      id
      username
    }
  }
`;
