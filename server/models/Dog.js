const { Schema, model } = require('mongoose');

const dogSchema = new Schema({
   ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'Owner',
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   birthday: {
      type: Date,
      required: true,
   },
   sex: {
      type: String,
      enum: ['Male', 'Female', 'Prefer not to say'],
      required: true,
   },
   weight: {
      type: Number,
   },
   personality: [
      {
         type: String,
         //figure out enum[]
      }
   ],
   headline: {
      type: String,
   },
   about: {
      type: String,
   },
   images: [
      {
         type: String,
      }
   ],
   tags: [
      {
         type: String,
      }
   ],
   conversationIds: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Conversation'
      }
   ]
},
{
   timestamps: true,
   toJSON: {
      getters: true,
   },
   id: false,
});

module.exports = model('Dog', dogSchema);