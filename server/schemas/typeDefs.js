const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type Owner {
      _id: ID
      username: String
      firstName: String
      lastName: String
      sex: String
      email: String
      lat: String
      lon: String
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
      createdAt: String
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
      getOwner(username: String, ownerId: ID): Owner
      getAllOwners: [Owner]

      getDog(dogId: ID!): Dog
      getAllDogs: [Dog]
      getAllDogsByOwner(ownerId: ID, username: String): [Dog]

      getAllConversationsByDogId(dogId: ID!): [Conversation]
      getConversationById(conversationId: ID!): [Message]
   }

   type Mutation {
      login(username: String, email: String, password: String!): Auth

      postOwner(owner: PostOwnerInput!): Auth
      putOwner(owner: PutOwnerInput!): Owner
      deleteOwner(password: String!): Owner
      addOwnerImage(imageURL: String!): Owner
      updateOwnerLocation(lat: String!, lon: String!): Owner

      postDog(dog: PostDogInput): Dog
      putDog(dogId: ID!, dog: PutDogInput): Dog
      deleteDog(dogId: ID!): Dog
      addDogImage(dogId: ID!, imageURL: String!): Dog

      postConversation(dogIds: [ID]): Conversation
      newMessage(conversationId: ID!, message: PostMessage): Conversation
   }
`

module.exports = typeDefs;