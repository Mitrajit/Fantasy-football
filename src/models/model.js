const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({}, { strict: false });

module.exports = mongoose.model('Games', dataSchema);
