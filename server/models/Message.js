const { Schema } = require('mongoose');

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
   id: false,
});

module.exports = messageSchema;