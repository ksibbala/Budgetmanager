const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose'); // Don't forget to import mongoose if using it in your code

// Create a new transaction
router.post('/', async (req, res) => {
  try {
    const { userId, amount, category, title } = req.body;

    // Create a new transaction
    const newTransaction = new Transaction({
      userId,
      amount,
      category,
      title,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all transactions for a user
router.get('/:userId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a summary of transactions (for example: total spent by category)
router.get('/summary/:userId', async (req, res) => {
  try {
    const transactions = await Transaction.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(req.params.userId) } },
      { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } }
    ]);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a transaction by ID
router.delete('/:transactionId', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Use deleteOne() instead of remove()
    await transaction.deleteOne();  // Correct way to delete a single document in Mongoose 6+
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a transaction by ID
router.put('/:transactionId', async (req, res) => {
  try {
    const { title, amount, category } = req.body;
    const transaction = await Transaction.findById(req.params.transactionId);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Update the transaction fields
    transaction.title = title || transaction.title;
    transaction.amount = amount || transaction.amount;
    transaction.category = category || transaction.category;

    // Save the updated transaction
    const updatedTransaction = await transaction.save();
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;