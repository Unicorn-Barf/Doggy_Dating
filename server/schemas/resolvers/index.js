const { ownerQuery, ownerMutation } = require('./ownerResolvers');
const { dogQuery, dogMutation } = require('./dogResolvers');
const { conversationQuery, conversationMutation } = require('./conversationResolvers');

const resolvers = {
   Query: {
      ...ownerQuery,
      ...dogQuery,
      ...conversationQuery,
   },
   Mutation: {
      ...ownerMutation,
      ...dogMutation,
      ...conversationMutation,
   }
}

module.exports = resolvers;