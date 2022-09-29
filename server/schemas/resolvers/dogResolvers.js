const { Dog, Owner } = require('../../models');
const { PersistedQueryNotFoundError } = require('apollo-server-express');

/*-------Query-------*/
const getDog = async (parent, args, context) => {
   try {
      const dog = await Dog.findById(args._id);
      if(!dog) {
         throw new PersistedQueryNotFoundError('Dog not found');
      }
      return dog;
   } catch(error) {
      console.error(error);
      throw new None('Internal server error');
   }
}

/*-------Mutation-------*/
const postDog = async (parent, args, context) => {
   try {
      const dog = await Dog.create({ ...args });
      if (!dog) {
         throw new None('Error posting dog');
      }
      const owner = await Owner.findByIdAndUpdate(
         args.ownerId,
         {
            $addToSet: {
               dogIds: dog._id,
            }
         },
         {
            new: true,
         }
      );
      if(!owner) {
         throw new None('Error updating owner');
      }
      return dog;
   } catch (error) {
      console.error(error);
      throw new None('Internal server error');
   }
}

module.exports = {
   dogQuery: {
      getDog,
   },
   dogMutation: {
      postDog,
   }
}