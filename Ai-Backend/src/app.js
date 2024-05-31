const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();  // Ensure this line is present

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.get('/', (req, res) => res.send('API Running'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

module.exports = app;
