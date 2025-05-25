const mongoose = require('mongoose');

const SaleDataSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerContact: {
    type: Number, 
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  saleDate: {
    type: Date, 
    required: true,
  },
  carImage: {
    type: String,
    required: false, 
  },
  type: {
    type: String, 
    required: true,
  },
}, { timestamps: true }); 

module.exports = mongoose.model('SaleData', SaleDataSchema);