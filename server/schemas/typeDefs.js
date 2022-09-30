const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type Owner {
      _id: ID
      username: String
      firstName: String
      lastName: String
      sex: String
      email: String
      about: String
      birthday: String
      images: [String]
   }

   input PostOwnerInput {
      username: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      sex: String!
      birthday: String!
   }

   input PutOwnerInput {
      username: String
      email: String
      firstName: String
      lastName: String
      sex: String
      birthday: String
      about: String
      images: [String]
      dogIds: [ID]
   }

   type Dog {
      _id: ID
      name: String
      birthday: String
      sex: String
      weight: Int
      personality: [String]
      headline: String
      about: String
      images: [String]
      tags: [String]
   }

   input PostDogInput {
      ownerId: ID!
      name: String!
      birthday: String!
      sex: String!
      weight: Int!
      personality: [String]
   }

   input PutDogInput {
      name: String
      birthday: String
      sex: String
      personality: [String]
      weight: Int
      headline: String
      about: String
      images: [String]
      tags: [String]
   }

   type Auth {
      token: ID
      owner: Owner
   }

   type Message {
      messageId: ID
      dogId: ID
      message: String
   }

   input PostMessage {
      dogId: ID!
      message: String!
   }

   type Conversation {
      _id: ID
      dogIds: [ID]
      messages: [Message]
   }

   type Query {
      getLoggedInOwner: Owner
      getOwner(username: String, _id: ID): Owner
      getAllOwners: [Owner]

      getDog(_id: ID): Dog
      getAllDogs: [Dog]
      getAllDogsByOwner(username: String!): [Dog]

      getConversationsByDogId(dogId: ID): [Conversation]
      getConversationById(_id: ID): Conversation
   }

   type Mutation {
      login(username: String, email: String, password: String!): Auth

      postOwner(owner: PostOwnerInput): Auth
      putOwner(owner: PutOwnerInput): Owner
      deleteOwner(password: String): Owner

      postDog(dog: PostDogInput): Dog
      putDog(dogId: ID!, dog: PutDogInput): Dog
      deleteDog(dogId: ID!): Dog

      postConversation(dogIds: [ID]): Conversation
      newMessage(conversationId: ID!, message: PostMessage): Conversation
   }
`

module.exports = typeDefs;