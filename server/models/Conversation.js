const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongodb');

const messageSchema = new Schema({
   messageId: {
      type: Schema.Types.ObjectId,
      default: new ObjectId(),
   },
   dogId: {
      type: Schema.Types.ObjectId,
      ref: 'Dog',
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
         require: true,
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