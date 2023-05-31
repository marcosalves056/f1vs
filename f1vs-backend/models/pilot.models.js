const mongoose = require('mongoose');

const pilotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Pilot = mongoose.model('Pilot', pilotSchema);

module.exports = Pilot;
