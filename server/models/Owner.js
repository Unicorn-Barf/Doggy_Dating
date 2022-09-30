const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const ownerSchema = new Schema({
   username: {
      type: String,
      unique: true,
      required: true,
      trim: true,      
   },
   email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-z'\d_\.-]+@[a-z\d\.-]+\.[a-z\.]{2,6}$/,
   },
   password: {
      type: String,
      required: true,
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
   birthday: {
      type: Date,
      required: true,
   },
   about: {
      type: String,
   },
   images: [
      {
         type: String,
      }
   ],
   dogIds: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Dog',
      }
   ],
   loggedInDog: {
      type: Schema.Types.ObjectId,
      ref: 'Dog',
   }
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

ownerSchema.methods.passwordCheck = async function(password) {
   return bcrypt.compare(password, this.password);
}

ownerSchema.virtual('dogCount').get(function() {
   return this.dogIds.length;
});

module.exports = model('Owner', ownerSchema);