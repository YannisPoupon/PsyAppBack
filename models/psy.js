const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const psySchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  spe: { type: String, required: true },
  county: { type: String, required: true },
  zipCode: { type: Number, required: true },
  city: { type: Number, required: true },

})

psySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Psy', psySchema);