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
    }
  }
}
`;