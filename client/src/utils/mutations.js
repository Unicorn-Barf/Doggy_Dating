import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation Mutation($password: String!, $username: String, $email: String) {
    login(password: $password, username: $username, email: $email) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
mutation PostOwner($owner: PostOwnerInput!) {
    postOwner(owner: $owner) {
      token
      owner {
        username
        firstName
        lastName
        sex
        email
        about
        birthday
      }
    }
  }
`;

// export const CREATE_DOG = gql`
//   mutation {

//   }
// `;