const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  userType: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: {
    type: {
      town: String,
      zipCode: Number,
      street: String,
      streetNumber: Number
    }, required: true
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);