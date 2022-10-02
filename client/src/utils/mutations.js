//Move into their respective mutation files and delete this file
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

export const UPLOAD_DOG_IMAGES = gql`
mutation Mutation($dogId: ID!, $imageURL: [String]!) {
   addDogImage(dogId: $dogId, imageURL: $imageURL) {
      _id
      name
      breed
      birthday
      sex
      weight
      personality
      headline
      about
      images
      tags
   }
}
`;

export const UPLOAD_OWNER_IMAGES = gql`
mutation AddOwnerImage($imageUrl: [String]!) {
   addOwnerImage(imageURL: $imageUrl) {
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
`;
