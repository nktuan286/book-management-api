const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true }
});

userSchema.methods.comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
}

module.exports = mongoose.model('User', userSchema);
