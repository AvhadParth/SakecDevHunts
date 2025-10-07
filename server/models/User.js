const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student','admin'], default: 'student' },
  college: { type: String, default: 'Shah and Anchor Kutcchi Engineering College' },
  branch: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
