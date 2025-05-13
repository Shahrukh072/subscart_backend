const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
 customerName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  date: { type: String, required: true }, 
  time: { type: String, required: true }, 
  status: { type: String, default: 'booked' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);