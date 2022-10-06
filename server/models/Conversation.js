const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongodb');

const messageSchema = new Schema({
   messageId: {
      type: Schema.Types.ObjectId,
      auto: true
   },
   dogId: {
      type: Schema.Types.ObjectId,
      ref: 'Dog',
      required: true,
   },
   message: {
      type: String,
      required: true,
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
         required: true,
      }
   ],
   messages: [messageSchema],
},
{
   timestamps: true,
   toJSON: {
      getters: true,
   },
   id: false,
});

module.exports = model('Conversation', convoSchema);