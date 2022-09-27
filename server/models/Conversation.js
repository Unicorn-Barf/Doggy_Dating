const { Schema, model } = require('mongoose');
const messageSchema = require('./Message');

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
   toJSON: {
      getters: true,
   },
   id: false,
});

module.exports = model('Conversation', convoSchema);