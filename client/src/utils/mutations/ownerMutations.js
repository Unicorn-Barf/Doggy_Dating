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

 