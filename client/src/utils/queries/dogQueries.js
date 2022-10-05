import { gql } from "@apollo/client";

export const GET_ALL_DOGS_BY_OWNER_ID = gql`
query GetAllDogsByOwner($ownerId: ID, $username: String) {
   getAllDogsByOwner(ownerId: $ownerId, username: $username) {
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

export const GET_DOG_BY_ID = gql`
query Query($dogId: ID!) {
   getDog(dogId: $dogId) {
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
