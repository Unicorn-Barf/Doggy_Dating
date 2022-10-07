import { gql } from "@apollo/client";

export const GET_CONVERSATIONS_BY_DOG_ID = gql`
query GetAllConversationsByDogId($dogId: ID!) {
    getAllConversationsByDogId(dogId: $dogId) {
      _id
      dogIds
      messages {
        messageId
        dogId
        dogName
        message
        createdAt
      }
    }
  }
`;

export const GET_CONVERSATION_BY_ID = gql`
query GetConversationById($conversationId: ID!) {
  getConversationById(conversationId: $conversationId) {
    messageId
    dogId
    dogName
    message
    createdAt
  }
}
`;