const express = require("express");
const router = express.Router();
const { optimizeAllocation } = require("../controllers/allocationController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes require authMiddleware
router.post("/", authMiddleware, optimizeAllocation);

module.exports = router;
