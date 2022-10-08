import { gql } from "@apollo/client";

export const GET_MESSAGES_SUB = gql`
subscription MessageSent($conversationId: ID!) {
  messageSent(conversationId: $conversationId) {
    _id
    dogIds
    messages {
      messageId
      message
      createdAt
      dogId
      dogName
    }
  }
}
`;

export const GET_CONVERSATIONS_SUB = gql`
subscription ConversationUpdated($dogId: ID!) {
  conversationUpdated(dogId: $dogId) {
    _id
    dogIds {
      name
      _id
      images
    }
    messages {
      messageId
      dogName
      message
      updatedAt
      createdAt
      dogId
    }
  }
}
`;