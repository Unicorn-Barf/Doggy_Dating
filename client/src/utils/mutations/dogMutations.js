import { gql } from "@apollo/client";

export const PUT_DOG = gql`
mutation PutDog($dogId: ID!, $dog: PutDogInput) {
   putDog(dogId: $dogId, dog: $dog) {
      _id
      ownerId {username}
      name
      breed
      birthday
      sex
      weight
      isFixed
      personality
      headline
      about
      images
      tags
   }
}`;

export const CREATE_DOG = gql`
mutation PostDog($dog: PostDogInput) {
    postDog(dog: $dog) {
      _id
      name
      breed
      birthday
      sex
      weight
      isFixed
      personality
      about
      images
      tags
    }
  }
`;

export const DELETE_DOG = gql`
mutation DeleteDog($dogId: ID!) {
   deleteDog(dogId: $dogId) {
     _id
     ownerId {username}
     name
     breed
     birthday
     sex
     weight
     isFixed
     personality
     headline
     about
     images
     tags
   }
 }`;