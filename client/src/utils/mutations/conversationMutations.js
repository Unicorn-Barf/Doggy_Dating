import { gql } from "@apollo/client";

export const POST_MESSAGE = gql`
mutation Mutation($conversationId: ID!, $message: PostMessage) {
  newMessage(conversationId: $conversationId, message: $message) {
    _id
    dogIds {
      name
      _id
      images
    }
    messages {
      messageId
      dogId
      message
      createdAt
    }
  }
}
`;

export const CREATE_CONVO = gql`
mutation PostConversation($dogIds: [ID]) {
  postConversation(dogIds: $dogIds) {
    _id
    dogIds {
      name
      _id
      images
    }
    messages {
      messageId
      dogId
      message
      createdAt
    }
  }
}
`;