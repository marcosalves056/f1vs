const mongoose = require('mongoose');

const TracksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  flag: {
    type: String,
    required: true,
  },
});

const Tracks = mongoose.model('tracks', TracksSchema);

module.exports = Tracks;
