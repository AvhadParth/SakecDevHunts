const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  branch: { type: String, required: true },
  course: { type: String },
  year: { type: Number, required: true },
  authors: [{ type: String }], // multiple authors
  techStack: [{ type: String }], // array of tech stacks
  githubLink: { type: String },
  fileUrl: { type: String },
  featuredImage: { type: String },
  approved: { type: Boolean, default: false },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
