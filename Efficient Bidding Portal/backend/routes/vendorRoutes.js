const express = require('express');
const router = express.Router();
const { createVendor, getVendor, getVendorById, updateVendor, deleteVendor } = require('../controllers/vendorController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createVendor);
router.get('/', getVendor);
router.get('/:id', getVendorById);
router.put('/:id', authMiddleware, updateVendor);
router.delete('/:id', authMiddleware, deleteVendor);

module.exports = router;
