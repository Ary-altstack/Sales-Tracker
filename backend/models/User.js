const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  contactNo : Number,
});

module.exports = mongoose.model('User', userSchema);
