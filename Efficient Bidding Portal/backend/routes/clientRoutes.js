const express = require('express');
const router = express.Router();
const { 
  createClient, 
  getClients, 
  getClientById, 
  updateClient, 
  deleteClient 
} = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes require authMiddleware
router.post('/', authMiddleware, createClient);
router.get('/', getClients);
router.get('/:id', getClientById);
router.put('/:id', authMiddleware, updateClient);
router.delete('/:id', authMiddleware, deleteClient);

module.exports = router;
