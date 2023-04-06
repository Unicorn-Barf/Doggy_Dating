import { gql } from "@apollo/client";

export const GET_MESSAGES_SUB = gql`
subscription Subscription($conversationId: ID!) {
  messageSent(conversationId: $conversationId) {
    _id
    dogIds {
      name
      images
    }
    messages {
      messageId
      dogId
      dogName
      message
      updatedAt
      createdAt
    }
  }
}
`;

export const GET_CONVERSATIONS_SUB = gql`
subscription Subscription($dogId: ID!) {
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