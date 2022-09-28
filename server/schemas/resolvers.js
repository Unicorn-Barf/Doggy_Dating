const { Owner, Dog } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
   Query: {
      getLoggedInOwner: async (parent, args, context) => {
         try {
            if(!context.owner) throw new Error('Not logged in!');
            const owner = Owner.findById(context.owner._id);
            return owner;
         } catch(error) {
            console.error(error);
            throw new Error(error);
         }
      },
      getOwner: async (parent, { username, _id }, context) => {
         try {
            return await Owner.findOne({
               $or: [{ _id: _id }, { username }],
            });
         } catch(error) {
            console.error(error);
            throw new Error(error);
         }
      },
      getAllOwners: async (parent, args, context) => {
         try {
            return await Owner.find();
         } catch(error) {
            console.error(error);
            throw new Error(error);
         }
      }
   },
   Mutation: {
      postOwner: async (parent, args, context) => {
         const owner = await Owner.create({...args});
         
         if(!owner) {
            throw new Error('Something went wrong');
         }

         const token = signToken(owner);
         return { token, owner };
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
      postDog: async (parent, args, context) => {
         try {
            const dog = await Dog.create({...args});
            
            if(!dog) {
               throw new Error('Something went wrong');
            }

            //add dog id to owner

            return dog;
         } catch(error) {
            console.error(error);
            throw new Error(error);
         }
      }
   }
}

module.exports = resolvers;