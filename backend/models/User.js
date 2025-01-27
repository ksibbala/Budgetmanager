const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // If password isn't modified, skip hashing
  }

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next();
  } catch (error) {
    next(error); // Pass any error to the next middleware
  }
});

// Method to compare input password with hashed password
userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;