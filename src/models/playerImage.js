const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: { type: String, required: true },
  imageURL: { type: String, required: true },
});

module.exports = mongoose.model('PlayerImages', schema);
