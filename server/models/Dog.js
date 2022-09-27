const { Schema, model } = require('mongoose');

const dogSchema = new Schema({
   ownerId: {
      type: Schema.Types.ObjectId,
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
   personality: [
      {
         type: String,
         //figure out enum[]
      }
   ],
   weight: {
      type: Number,
   },
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
   displayImage: {
      type: Number,
      //index of image to display on front page
   },
   tags: [
      {
         type: String,
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