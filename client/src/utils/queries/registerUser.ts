import { gql } from "@apollo/client";

export const registerUser = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    data: registerUser(registerUserInput: { username: $username, email: $email, password: $password })
  }
`;
