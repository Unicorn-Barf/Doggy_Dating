import { gql } from "@apollo/client";
export const LOGIN_USER = gql`
mutation Mutation($password: String!, $username: String, $email: String) {
    login(password: $password, username: $username, email: $email) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!, $sex: String!, $birthday: String!) {
  signUp(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName, sex: $sex, birthday: $birthday) {
    token
    owner {
      username
    }
  }
}

`;
