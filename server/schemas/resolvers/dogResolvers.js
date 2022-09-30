const { Dog, Owner } = require('../../models');
const { PersistedQueryNotFoundError, ForbiddenError } = require('apollo-server-express');

/*-------Query-------*/
const dogQuery = {
   getDog: async (parent, args, context) => {
      try {
         const dog = await Dog.findById(args._id);
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
   }
}

/*-------Mutation-------*/
const dogMutation = {
   postDog: async (parent, args, context) => {
      try {
         console.log(args);
         const { ownerId, name, birthday, sex, weight } = args.dog;
         const dog = await Dog.create({
            ownerId: ownerId,
            name: name,
            birthday: Date.parse(birthday),
            sex: sex,
            weight: weight,
         });
         await Owner.findByIdAndUpdate(ownerId, { $addToSet:{ dogIds: dog._id } }, { new: true });
         return dog;
      } catch (error) {
         console.error(error);
      }
   },
   putDog: async (parent, args, context) => {
      try {
         const dog = await Dog.findById(args.dogId);
         if(dog.ownerId === context.owner._id) {
            const updatedDog = await Dog.findByIdAndUpdate(args.dogId, { ...args.dog }, { new: true });
            return updatedDog;
         } else {
            throw new ForbiddenError('You cannot edit this dog');
         }
      } catch(error) {
         console.error(error);
      }
   },
   deleteDog: async (parent, args, context) => {
      try {
         const dog = await Dog.findById(args.dogId);
         if(dog.ownerId === context.owner._id) {
            const deletedDog = await Dog.findByIdAndDelete(args.dogId);
            return deletedDog;
         } else {
            throw new ForbiddenError('You cannot delete this dog');
         }
      } catch(error) {
         console.error(error);
      }
   }
}

module.exports = {
   dogQuery,
   dogMutation,
}