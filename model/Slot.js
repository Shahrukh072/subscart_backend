const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  time: { type: String, required: true }, 
});

module.exports = mongoose.model('Slot', slotSchema);
