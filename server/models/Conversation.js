const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
   dogId: {
      type: Schema.Types.ObjectId,
      require: true,
   },
   message: {
      type: String,
      require: true,
   },
},
{
   timestamps: true,
   toJSON: {
      getters: true,
   },
   id: false,
});

const convoSchema = new Schema({
   dogIds: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Dog',
      }
   ],
   messageIds: [messageSchema],
},
{
   timestamps: true,
   toJSON: {
      getters: true,
   },
   id: false,
});

module.exports = model('Conversation', convoSchema);