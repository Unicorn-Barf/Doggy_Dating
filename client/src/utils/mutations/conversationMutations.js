import { gql } from "@apollo/client";

export const POST_MESSAGE = gql`
mutation Mutation($conversationId: ID!, $message: PostMessage) {
  newMessage(conversationId: $conversationId, message: $message) {
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