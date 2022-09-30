const { Dog, Conversation } = require('../../models');

/*-------Query-------*/
const conversationQuery = {
   getAllConversationsByDogId: async (parent, args, context) => {
      try {
         const dog = await Dog.findById(args.dogId);
         const conversations = await Conversation.find().where('_id').in(dog.conversationIds).exec();
         return conversations;
      } catch(error) {
         console.error(error);
      }
   },
   getConversationById: async (parent, args, context) => {
      try {
         const conversation = await Conversation.findById(args.conversationId);
         const messages = conversation.messages;
         return messages;
      } catch(error) {
         console.error(error);
      }
   }
}

/*-------Mutation-------*/
const conversationMutation = {
   postConversation: async (parent, args, context) => {
      try {
         const conversation = await Conversation.create({dogIds: args.dogIds});
         //put this conversation id in every dog
         for(let i=0; i<args.dogIds.length; i++) {
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
      } catch(error) {
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
         return conversation;
      } catch(error) {
         console.error(error);
      }
   }
}

module.exports = {
   conversationQuery,
   conversationMutation,
}