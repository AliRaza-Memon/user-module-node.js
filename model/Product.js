const mongoose = require('mongoose');
const User = require('./User')

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
