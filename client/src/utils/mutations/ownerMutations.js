import { gql } from "@apollo/client";
export const SIGNUP_USER = gql `
mutation Signup($owner: PostOwnerInput!) {
    postOwner(owner: $owner) {
      token
      owner {
        _id
        username
        firstName
        lastName
        sex
        email
        lat
        lon
        about
        birthday
        images
      }
    }
  }
`;
export const LOGIN_USER = gql`
mutation LOGIN($password: String!, $username: String, $email: String) {
   login(password: $password, username: $username, email: $email) {
     token
     owner {
       _id
       username
       firstName
       lastName
       sex
       email
       about
       birthday
       images
       lon
       lat
     }
   }
 }
`;

 