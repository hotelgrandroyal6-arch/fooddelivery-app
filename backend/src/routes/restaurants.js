const express = require('express');
const { getAllRestaurants, getRestaurantById, createRestaurant } = require('../controllers/restaurantController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

// Protected routes
router.post('/', authenticate, authorize('restaurant', 'admin'), createRestaurant);

module.exports = router;