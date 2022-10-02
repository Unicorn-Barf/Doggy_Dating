import { gql } from "@apollo/client";

export const GET_ALL_DOGS_BY_OWNER_ID = gql`
query GetAllDogsByOwner($ownerId: ID) {
   getAllDogsByOwner(ownerId: $ownerId) {
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