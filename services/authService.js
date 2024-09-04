const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

/**
 * Do login
 * @param email
 * @param password
 * @returns Return a token
 */
exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found!');
  }

  const isMatch = await user.comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials!');
  }

  const payload = {
    user: {
      email
    }
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
}

/**
 * Do register
 * @param email
 * @param password
 * @returns Return a token
 */
exports.signup = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error('User already exists!');
  }

  const newUser = new User({
    email,
    password: await bcrypt.hash(password, 10)
  });

  try {
    await newUser.save();
  } catch (error) {
    throw new Error(error.message);
  }

  const payload = {
    user: {
      email
    }
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
}
