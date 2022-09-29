const { Owner } = require('../../models');
const { AuthenicationError, PersistedQueryNotFoundError } = require('apollo-server-express');
const { signToken } = require('../../utils/auth');

/*-------Query-------*/
const ownerQuery = {
   getLoggedInOwner: async (parent, args, context) => {
      try {
         if (!context.owner) {
            throw new PersistedQueryNotFoundError('Logged in user not found');
         }
         const owner = Owner.findById(context.owner._id);
         if(!owner) {
            throw new PersistedQueryNotFoundError('Logged in user not found');
         }
         return owner;
      } catch (error) {
         console.error(error);
      }
   },
   getOwner: async (parent, args, context) => {
      try {
         const { username, _id } = args;
         return await Owner.findOne({
            $or: [{ _id: _id }, { username }],
         });
      } catch (error) {
         console.error(error);
      }
   },
   getAllOwners: async (parent, args, context) => {
      try {
         return await Owner.find();
      } catch (error) {
         console.error(error);
      }
   }
}

/*-------Mutation-------*/
const ownerMutation = {
   postOwner: async (parent, args, context) => {
      try {
         const { username, email, password, firstName, lastName, sex, birthday } = args.owner;
         const owner = await Owner.create({
            username: username,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            sex: sex,
            birthday: Date.parse(birthday),
         });

         if(!owner) {
            throw Error('Error in creating owner');
         }

         const token = signToken(owner);
         return { token, owner };
      } catch (error) {
         console.error(error);
      }
   },
   login: async (parent, args, context) => {
      const owner = await Owner.findOne({ $or: [{ username }, { email }] });
      if (!owner) {
         throw new AuthenticationError('Error logging in!');
      }

      const passwordCheck = await Owner.passwordCheck(password);
      if (!passwordCheck) {
         throw new AuthenticationError('Error logging in!');
      }

      const token = signToken(owner);
      return { token, owner };
   }
}


module.exports = {
   ownerQuery,
   ownerMutation,
}