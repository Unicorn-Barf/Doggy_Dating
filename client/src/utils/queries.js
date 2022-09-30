import { gql } from "apollo-server-express";

// dog queries
export const GET_DOG_BY_ID = gql`
query GetDog($dogId: ID!) {
    getDog(dogId: $dogId) {
      _id
      name
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

  