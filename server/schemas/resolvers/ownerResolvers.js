const { Owner } = require('../../models');
const { AuthenicationError, PersistedQueryNotFoundError, None } = require('apollo-server-express');
const { signToken } = require('../../utils/auth');

/*-------Query-------*/
const getLoggedInOwner = async (parent, args, context) => {
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
      throw new None('Internal server error');
   }
}

const getOwner = async (parent, args, context) => {
   const { username, _id } = args;
   try {
      return await Owner.findOne({
         $or: [{ _id: _id }, { username }],
      });
   } catch (error) {
      console.error(error);
      throw new None('Internal server error');
   }
}

const getAllOwners = async (parent, args, context) => {
   try {
      return await Owner.find();
   } catch (error) {
      console.error(error);
      throw new None('Internal server error');
   }
}

/*-------Mutation-------*/
const postOwner = async (parent, args, context) => {
   const owner = await Owner.create({ ...args });

   if (!owner) {
      throw new Error('Something went wrong');
   }

   const token = signToken(owner);
   return { token, owner };
}

const login = async (parent, args, context) => {
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


module.exports = {
   ownerQuery: {
      getLoggedInOwner,
      getOwner,
      getAllOwners,
   },
   ownerMutation: {
      postOwner,
      login,
   }
}