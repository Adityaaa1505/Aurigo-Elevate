const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const vendorRoutes = require('./routes/vendorRoutes');
const clientRoutes = require('./routes/clientRoutes');
const allocationRoutes = require('./routes/allocationRoutes');
const negotiationRoutes = require('./routes/negotiationRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const authRoutes = require('./routes/authRoutes'); // New authentication routes
const productRoutes = require('./routes/productRoutes'); // Product routes


// Initialize express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Routes setup
app.use('/api/vendors', vendorRoutes);         // Vendor-related routes
app.use('/api/clients', clientRoutes);         // Client-related routes
app.use('/api/alloc', allocationRoutes);         // Tender matching routes
app.use('/api/negotiations', negotiationRoutes); // Negotiation routes
app.use('/api/transactions', transactionRoutes); // Transaction routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/products', productRoutes); // Product-related routes

// Root route (can be customized)
app.get('/', (req, res) => {
  res.send('Welcome to the Tender Optimization Platform!');
});

// Set the server to listen on a port
const PORT = process.env.PORT || 5000; // Default to port 5000 if not specified
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
