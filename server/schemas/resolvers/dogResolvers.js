const { Dog, Owner } = require('../../models');
const { PersistedQueryNotFoundError, ForbiddenError, UserInputError } = require('apollo-server-express');

/*-------Query-------*/
const dogQuery = {
   getDog: async (parent, args, context) => {
      try {
         const dog = await Dog.findById(args.dogId).populate("ownerId");
         if(!dog) {
            throw new PersistedQueryNotFoundError('Dog not found');
         }
         return dog;
      } catch(error) {
         console.error(error);
         
      }
   },
   getAllDogs: async (parent, args, context) => {
      try {
         const dogs = await Dog.find();
         if(!dogs) {
            throw new PersistedQueryNotFoundError('Dogs not found');
         }
         return dogs;
      } catch(error) {
         console.error(error);
         
      }
   },
   getAllDogsByOwner: async (parent, args, context) => {
      try {
         if(args.ownerId && args.username) {
            throw new UserInputError('Cannot have both ownerId and username');
         }
         const owner = await Owner.findOne({ $or: [{ _id: args.ownerId }, { username: args.username }] });

         const dogs = await Dog.find({ ownerId: owner._id });

         return dogs;
      } catch(error) {
         console.error(error);
      }
   }
}

/*-------Mutation-------*/
const dogMutation = {
   postDog: async (parent, args, context) => {
      try {
         
         const dog = await Dog.create({
            ...args.dog
         });
         const postDog = await Owner.findByIdAndUpdate(context.owner._id, { $addToSet:{ dogIds: dog._id } }, { new: true });
         
         return dog;
      } catch (error) {
         console.error(error);
      }
   },
   putDog: async (parent, args, context) => {
      try {
         const updatedDog = await Dog.findByIdAndUpdate(
            args.dogId,
            {
               ...args.dog
            },
            {
               new: true,
               omitUndefined: true,
            }
         );
         return updatedDog;
      } catch(error) {
         console.error(error);
      }
   },
   deleteDog: async (parent, args, context) => {
      try {
         const dog = await Dog.findById(args.dogId);
         if(dog.ownerId.toString() === context.owner._id.toString()) {
            const deletedDog = await Dog.findByIdAndDelete(args.dogId);
            return deletedDog;
         } else {
            throw new ForbiddenError('You cannot delete this dog');
         }
      } catch(error) {
         console.error(error);
      }
   },
   addDogImage: async (parent, args, context) => {
      try {
         const dog = await Dog.findByIdAndUpdate(
            args.dogId,
            {
               $push: {
                  images: args.imageURL,
               }
            },
            {
               new: true,
            }
         );
         return dog;
      } catch(error) {
         console.error(error);
      }
   }
}

module.exports = {
   dogQuery,
   dogMutation,
}
