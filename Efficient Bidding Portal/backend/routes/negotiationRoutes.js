const express = require('express');
const router = express.Router();
const { 
  createNegotiation, 
  updateNegotiation 
} = require('../controllers/negotiationController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes require authMiddleware
router.post('/', authMiddleware, createNegotiation);
router.put('/:id', authMiddleware, updateNegotiation);

module.exports = router;
