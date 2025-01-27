const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

// Create or update a user's budget
router.post('/', async (req, res) => {
  try {
    const { userId, totalBudget, savingsGoal } = req.body;

    // Check if the user already has a budget
    let budget = await Budget.findOne({ userId });

    if (budget) {
      // Update the existing budget
      budget.totalBudget = totalBudget;
      budget.savingsGoal = savingsGoal;
      await budget.save();
      res.status(200).json(budget);
    } else {
      // Create a new budget
      const newBudget = new Budget({
        userId,
        totalBudget,
        savingsGoal,
      });

      const savedBudget = await newBudget.save();
      res.status(201).json(savedBudget);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get the current budget for a user
router.get('/:userId', async (req, res) => {
  try {
    const budget = await Budget.findOne({ userId: req.params.userId });
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;