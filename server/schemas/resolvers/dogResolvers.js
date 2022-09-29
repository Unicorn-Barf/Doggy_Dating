const { Dog, Owner } = require('../../models');
const { PersistedQueryNotFoundError } = require('apollo-server-express');

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
         const { ownerId, name, birthday, sex, weight } = args.dog;
         const dog = await Dog.create({
            ownerId: ownerId,
            name: name,
            birthday: Date.parse(birthday),
            sex: sex,
            weight: weight,
         });
         const owner = await Owner.findByIdAndUpdate(
            ownerId,
            {
               $addToSet: {
                  dogIds: dog._id,
               }
            },
            {
               new: true,
            }
         );
         return dog;
      } catch (error) {
         console.error(error);
      }
   }
}

module.exports = {
   dogQuery,
   dogMutation,
}