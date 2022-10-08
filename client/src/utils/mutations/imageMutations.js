import { gql } from "@apollo/client";

export const UPLOAD_DOG_IMAGES = gql`
mutation AddDogImage($dogId: ID!, $imageUrl: [String]!) {
   addDogImage(dogId: $dogId, imageURL: $imageUrl) {
     _id
   }
 }`;

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