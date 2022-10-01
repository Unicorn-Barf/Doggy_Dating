import { gql } from "@apollo/client";

// dog queries
export const GET_DOG_BY_ID = gql`
query GetDog($dogId: ID!) {
    getDog(dogId: $dogId) {
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