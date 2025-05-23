const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  university: { type: String },
  ProfileImg: { type: String },
  role: { type: String, default: 'user' }, // Add role field
});

module.exports = mongoose.model('User', UserSchema);