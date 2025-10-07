const fs = require('fs');
const path = require('path');
const Project = require('../models/Project');

const createProject = async (req, res) => {
  try {
    const { title, abstract, branch, course, year, authors, techStack, githubLink } = req.body;

    // Convert comma-separated authors and tech stacks into arrays
    const authorsArray = authors ? authors.split(',').map(a => a.trim()) : [];
    const techArray = techStack ? techStack.split(',').map(t => t.trim()) : [];

    const fileUrl = req.file ? '/uploads/' + req.file.filename : undefined;
    const featuredImage = req.body.featuredImage || fileUrl;
    const approved = req.user && req.user.role === 'admin' ? true : false;

    const project = await Project.create({
      title,
      abstract,
      branch,
      course,
      year: Number(year),
      authors: authorsArray,
      techStack: techArray,
      githubLink,
      fileUrl,
      featuredImage,
      approved,
      uploader: req.user._id
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const listProjects = async (req, res) => {
  try {
    const { q, branch, year, approved } = req.query;
    const filter = {};
    if (q) filter.$or = [
      { title: new RegExp(q, 'i') },
      { abstract: new RegExp(q, 'i') },
      { authors: new RegExp(q, 'i') },
      { techStack: new RegExp(q, 'i') }
    ];
    if (branch) filter.branch = branch;
    if (year) filter.year = Number(year);
    if (approved !== undefined) filter.approved = approved === 'true';
    const projects = await Project.find(filter)
      .populate('uploader', 'name email branch')
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('uploader', 'name email branch');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const approveProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    project.approved = true;
    await project.save();
    res.json({ message: 'Project approved', project });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ uploader: req.user._id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (!(req.user.role === 'admin' || project.uploader.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    if (project.fileUrl) {
      try {
        const filename = project.fileUrl.split('/').pop();
        const filePath = path.join(__dirname, '..', 'uploads', filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (e) {}
    }
    await project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createProject, listProjects, getProject, approveProject, getMyProjects, deleteProject };
