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

   type Dog {
      _id: ID
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

   type Query {
      owner(username: String, _id: ID): Owner
      me: Owner
   }

   type Mutation {
      addOwner(username: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
      login(username: String, email: String, password: String!): Auth

      addDog(ownderId: ID!, name: String!): Dog
   }
`

module.exports = typeDefs;