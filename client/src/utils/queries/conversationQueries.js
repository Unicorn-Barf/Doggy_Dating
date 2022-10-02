import { gql } from "@apollo/client";

export const GET_CONVERSATIONS_BY_DOG_ID = gql`
query GetAllConversationsByDogId($dogId: ID!) {
    getAllConversationsByDogId(dogId: $dogId) {
      _id
      dogIds
      messages {
        messageId
        dogId
        message
        createdAt
      }
    }
  }
`;