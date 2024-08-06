const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/admin');
const connectDB = require('./db/connection')
const usersRoutes = require('./routes/users');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB()
// Routes
app.use('/admin', adminRoutes);
app.use('/users', usersRoutes);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
