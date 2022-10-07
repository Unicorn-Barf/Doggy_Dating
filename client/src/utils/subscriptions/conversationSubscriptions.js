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
subscription Subscription($dogId: ID!) {
  conversationUpdated(dogId: $dogId) {
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