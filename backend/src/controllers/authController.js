const { hashPassword, comparePassword, generateToken } = require('../utils/auth');
const { v4: uuidv4 } = require('uuid');

// Placeholder for database connection
// In production, this would use an actual database

const register = async (req, res) => {
  try {
    const { email, password, phone, first_name, last_name, role } = req.body;

    // Input validation
    if (!email || !password || !phone || !role) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Missing required fields: email, password, phone, role'
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user object (in production, save to database)
    const user = {
      id: uuidv4(),
      email,
      password_hash: hashedPassword,
      phone,
      first_name,
      last_name,
      role,
      created_at: new Date().toISOString()
    };

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Email and password are required'
      });
    }

    // In production, fetch user from database
    // For now, create a mock user
    const user = {
      id: uuidv4(),
      email,
      role: 'customer',
      first_name: 'John',
      last_name: 'Doe'
    };

    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

const refreshToken = (req, res) => {
  try {
    const newToken = generateToken(req.user);
    res.status(200).json({
      message: 'Token refreshed successfully',
      token: newToken
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

module.exports = { register, login, refreshToken };