const express = require('express');
const { register, login, refreshToken } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.post('/refresh', authenticate, refreshToken);

module.exports = router;