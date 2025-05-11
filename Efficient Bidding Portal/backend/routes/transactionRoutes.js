const express = require('express');
const router = express.Router();
const { 
  createTransaction, 
  getTransactions 
} = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes require authMiddleware
router.post('/', authMiddleware, createTransaction);
router.get('/', getTransactions);

module.exports = router;
