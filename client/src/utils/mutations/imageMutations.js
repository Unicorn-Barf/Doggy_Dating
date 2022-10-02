import { gql } from "@apollo/client";

export const UPLOAD_DOG_IMAGES = gql`
mutation Mutation($dogId: ID!, $imageUrl: [String]!) {
   addDogImage(dogId: $dogId, imageURL: $imageUrl) {
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