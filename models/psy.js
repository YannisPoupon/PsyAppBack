const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const psySchema = mongoose.Schema({
  userType: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  adeliNumber: { type: Number, required: true, unique: true },
  approach: { type: String, required: true },
  specializations: [String],
  hourPrice: { type: Number, required: true },
  address: {
    type: {
      town: String,
      zipCode: Number,
      street: String,
      streetNumber: Number
    }, required: true,
  },
  consultationAddress: {
    type: {
      town: String,
      zipCode: Number,
      street: String,
      streetNumber: Number,
    }, required: true
  },
  coordinates: {
    type:
    {
      lat: Number,
      lng: Number
    }, required: true
  }
})

psySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Psy', psySchema);