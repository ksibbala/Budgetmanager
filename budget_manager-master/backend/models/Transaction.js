const mongoose = require('mongoose');

// Define the allowed categories
const allowedCategories = [
  'Food',
  'Transport',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Shopping',
  'Rent',
  'Miscellaneous'
];

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: allowedCategories,  // Only these categories are allowed
    message: 'Invalid category, must be one of ' + allowedCategories.join(', ') 
  },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);