const { Dog, Conversation } = require('../../models');
const { PubSub } = require('graphql-subscriptions');

// Apollo Subscriptions Utility
const pubsub = new PubSub();


/*-------Query-------*/
const conversationQuery = {
   getAllConversationsByDogId: async (parent, args, context) => {
      try {
         const dog = await Dog.findById(args.dogId);
         const conversations = await Conversation.find().where('_id').in(dog.conversationIds).exec();
         return conversations;
      } catch (error) {
         console.error(error);
      }
   },
   getConversationById: async (parent, args, context) => {
      try {
         const conversation = await Conversation.findById(args.conversationId);
         const messages = conversation.messages;
         return messages;
      } catch (error) {
         console.error(error);
      }
   }
}

/*-------Mutation-------*/
const conversationMutation = {
   postConversation: async (parent, args, context) => {
      try {
         const conversation = await Conversation.create({ dogIds: args.dogIds });
         //put this conversation id in every dog
         for (let i = 0; i < args.dogIds.length; i++) {
            console.log(args.dogIds[i]);
            await Dog.findByIdAndUpdate(
               args.dogIds[i],
               {
                  $addToSet: {
                     conversationIds: conversation._id,
                  },
               },
               {
                  new: true,
               },
            );
         }
         return conversation;
      } catch (error) {
         console.error(error);
      }
   },
   newMessage: async (parent, args, context) => {
      try {
         const conversation = await Conversation.findByIdAndUpdate(
            args.conversationId,
            {
               $push: {
                  messages: args.message,
               },
            },
            {
               new: true,
            },
         );
         console.log(conversation);
         // Publish Subscription Event
         const { dogIds, _id, messages } = conversation;
         pubsub.publish('NEW_MESSAGE', {  dogIds, _id, messages });

         return conversation;
      } catch (error) {
         console.error(error);
      }
   },
   addDogToConversation: async (parent, args, context) => {
      try {
         await Dog.findByIdAndUpdate(
            args.dogId,
            {
               $push: {
                  conversationIds: args.conversationId,
               }
            },
            {
               new: true,
            }
         );
         const conversation = await Conversation.findByIdAndUpdate(
            args.conversationId,
            {
               $push: {
                  dogIds: args.dogId,
               }
            },
            {
               new: true,
            }
         );
         return conversation;
      } catch (error) {
         console.error(error);
      }
   }
}

/*-------Subscription-------*/
const conversationSubscription = {
   messageSent: {
      subscribe: () => pubsub.asyncIterator(['NEW_MESSAGE']),
   },
}


module.exports = {
   conversationQuery,
   conversationMutation,
   conversationSubscription
}