const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth'); // Import the auth middleware

// Create a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /me - Fetch the logged-in user's data
// Route to get logged in user's data
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // `req.user` is populated by the auth middleware after verifying the JWT
    const user = await User.findById(req.user.id);  // Use user ID from the decoded token
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);  // Return user data
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;