const { Owner, Dog } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
   Query: {
      owner: async (parent, { username, _id }, context) => {
         try {
            return await Owner.findOne({
               $or: [{ _id: _id }, { username }],
            });
         } catch(error) {
            console.error(error);
            throw new Error(error);
         }
      },
      me: async (parent, args, context) => {
         try {
            if(!context.owner) throw new Error('Not logged in!');
            const owner = Owner.findById(context.owner._id);
            return owner;
         } catch(error) {
            console.error(error);
            return error;
         }
      }
   },
   Mutation: {
      addOwner: async (parent, args, context) => {
         const owner = await Owner.create({...args});
         console.log(owner);
         if(!owner) {
            throw new Error('Something went wrong');
         }

         const token = signToken(owner);
         return { token, user };
      },
      login: async (parent, { username, email, password }, context) => {
         const owner = await Owner.findOne({ $or: [{ username }, { email }] });
         if(!owner) {
            throw new AuthenticationError('Error logging in!');
         }

         const passwordCheck = await Owner.passwordCheck(password);

         if(!passwordCheck) {
            throw new AuthenticationError('Error logging in!');
         }

         const token = signToken(owner);
         return { token, owner };
      },
      addDog: async (parent, args, context) => {
         try {
            const dog = await Dog.create({...args});
            
            if(!dog) {
               throw new Error('Something went wrong');
            }
            return dog;
         } catch(error) {
            console.error(error);
            throw new Error(error);
         }
      }
   }
}