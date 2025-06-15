// src/app.js

require('dotenv').config();
const express       = require('express');
const userRoutes    = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes    = require('./routes/taskRoutes');
const reportRoutes  = require('./routes/reportRoutes');

// ← Here’s the missing line:
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount your routers
app.use('/api', userRoutes);
app.use('/api', projectRoutes);
app.use('/api', taskRoutes);
app.use('/api', reportRoutes);

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
