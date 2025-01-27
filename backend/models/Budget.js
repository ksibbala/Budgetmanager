const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalBudget: { type: Number, required: true },
  savingsGoal: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);