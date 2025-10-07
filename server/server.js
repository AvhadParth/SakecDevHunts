require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// routes (keep if they exist)
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// connect to DB
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// health check root endpoint used by Railway
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'SakecDevHunts API' });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// fallback for unknown API endpoints (return 404 but not crash)
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// global error handler (prevents crashes bubbling)
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err && err.stack ? err.stack : err);
  res.status(500).json({ message: 'Server error' });
});

// start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
