require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');

async function run() {
  await connectDB();

  const email = 'admin@sakec.edu';
  const plain = 'Admin@123';
  const hash = await bcrypt.hash(plain, 10);

  const existing = await User.findOne({ email });
  if (existing) {
    existing.name = 'Sakec Admin';
    existing.password = hash;
    existing.role = 'admin';
    existing.branch = 'Administration';
    await existing.save();
    console.log('✅ Updated existing admin:', email);
  } else {
    await User.create({
      name: 'Sakec Admin',
      email,
      password: hash,
      role: 'admin',
      branch: 'Administration'
    });
    console.log('✅ Created admin:', email);
  }

  process.exit(0);
}

run().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
