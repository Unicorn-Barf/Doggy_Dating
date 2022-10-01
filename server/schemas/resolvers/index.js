const { ownerQuery, ownerMutation } = require('./ownerResolvers');
const { dogQuery, dogMutation } = require('./dogResolvers');
const { conversationQuery, conversationMutation, conversationSubscription } = require('./conversationResolvers');

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
   },
   Subscription: {
      ...conversationSubscription,
   }
}

module.exports = resolvers;