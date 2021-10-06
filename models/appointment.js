const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  psy: { type: mongoose.Schema.Types.ObjectId, ref: 'Psy', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  duration: { type: Number, required: true },
  appointmentAddress: {
    type: {
      town: String,
      zipCode: Number,
      street: String,
      streetNumber: Number
    }, required: true
  }
});

module.exports = mongoose.model('Consultation', appointmentSchema);