require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const Project = require('./models/Project');

const run = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Project.deleteMany({});

    const adminPass = await bcrypt.hash('Admin@123', 10);
    const studentPass = await bcrypt.hash('Student@123', 10);

    const admin = await User.create({
      name: 'Sakec Admin',
      email: 'admin@sakec.edu',
      password: adminPass,
      role: 'admin',
      branch: 'Administration'
    });

    const demoStudent = await User.create({
      name: 'Demo Student',
      email: 'student@sakec.edu',
      password: studentPass,
      role: 'student',
      branch: 'Information Technology'
    });

    const sampleProjects = [
      {
        title: 'Smart Attendance System using Face Recognition',
        abstract: 'Attendance system using OpenCV and face embeddings to recognise students and auto mark attendance. Built with Python and Flask for backend.',
        branch: 'Information Technology',
        course: 'B.Tech Information Technology',
        year: 2024,
        authors: 'A. Kumar, S. Patel',
        githubLink: '',
        fileUrl: '',
        featuredImage: '',
        approved: true,
        uploader: demoStudent._id
      },
      {
        title: 'AI-based Plagiarism Detector',
        abstract: 'Tool to detect code plagiarism across submissions using tokenization and semantic similarity measures.',
        branch: 'Computer Engineering',
        course: 'B.Tech Computer Engineering',
        year: 2023,
        authors: 'R. Shah',
        githubLink: '',
        fileUrl: '',
        featuredImage: '',
        approved: true,
        uploader: demoStudent._id
      }
    ];

    await Project.insertMany(sampleProjects);

    console.log('Seeding complete. Admin credentials: admin@sakec.edu / Admin@123');
    console.log('Demo student: student@sakec.edu / Student@123');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
