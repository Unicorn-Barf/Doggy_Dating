const { ownerQuery, ownerMutation } = require('./ownerResolvers');
const { dogQuery, dogMutation } = require('./dogResolvers');

const resolvers = {
   Query: {
      ...ownerQuery,
      ...dogQuery,
   },
   Mutation: {
      ...ownerMutation,
      ...dogMutation,
   }
}

module.exports = resolvers;