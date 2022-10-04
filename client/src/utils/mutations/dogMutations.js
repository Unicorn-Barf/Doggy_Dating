import { gql } from '@apollo/client';

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