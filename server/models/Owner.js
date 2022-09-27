const { Schema, model } = require('mongoose');
const Dog = require('./Dog');

const ownerSchema = new Schema({
   username: {
      type: String,
      unique: true,
      required: true,
      trim: true,      
   },
   firstName: {
      type: String,
      required: true,
   },
   lastName: {
      type: String,
      required: true,
   },
   sex: {
      type: String,
      enum: ['Male', 'Female', 'Prefer not to say'],
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-z\d_\.-]+@[a-z\d\.-]+\.[a-z\.]{2,6}$/,
   },
   password: {
      type: String,
      required: true,
   },
   about: {
      type: String,
   },
   birthday: {
      type: Date,
      required: true,
   },
   images: [
      {
         type: String,
      }
   ],
   profileImage: {
      type: Number,
   },
   dogIds: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Dog',
      }
   ],
},
{
   timestamps: true,
   toJSON: {
      virtuals: true,
      getters: true,
   },
   id: false,
});

ownerSchema.pre('save', async function(next) {
   if(this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
   }
   next();
});

module.exports = model('Owner', ownerSchema);