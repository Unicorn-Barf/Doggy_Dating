import { gql } from "@apollo/client";

export const PUT_DOG = gql`
mutation PutDog($dogId: ID!, $dog: PutDogInput) {
   putDog(dogId: $dogId, dog: $dog) {
      _id
      ownerId
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
      personality
      about
      images
      tags
    }
  }
`;