const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: false },
  district: { type: String, required: false },
  qualification: { type: String, required: false },
  educationLevel: { type: String, required: false },
  introduction: { type: String, required: false },
  profilePicture: { type: String, required: false },  // Store file path
});

const User = mongoose.model('updateUser', userSchema);

module.exports = User;
