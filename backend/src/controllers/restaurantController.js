const { v4: uuidv4 } = require('uuid');

// Mock restaurants database
const restaurants = [
  {
    id: 1,
    owner_id: 'owner-1',
    name: 'Pizza Palace',
    description: 'Best pizza in town',
    cuisine_type: 'Italian',
    rating: 4.5,
    total_ratings: 250,
    address: {
      street: '123 Main St',
      city: 'Mumbai',
      state: 'MH',
      postal_code: '400001'
    },
    latitude: 19.0760,
    longitude: 72.8777,
    phone: '+91-1234567890',
    opening_time: '10:00',
    closing_time: '23:00',
    is_open: true,
    delivery_fee: 50,
    min_order_amount: 200,
    avg_delivery_time: 30
  }
];

const getAllRestaurants = (req, res) => {
  try {
    const { search, cuisine, page = 1, limit = 10 } = req.query;

    let filtered = restaurants;

    if (search) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (cuisine) {
      filtered = filtered.filter(r =>
        r.cuisine_type.toLowerCase() === cuisine.toLowerCase()
      );
    }

    const start = (page - 1) * limit;
    const end = start + parseInt(limit);
    const paginatedRestaurants = filtered.slice(start, end);

    res.status(200).json({
      restaurants: paginatedRestaurants,
      total: filtered.length,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

const getRestaurantById = (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = restaurants.find(r => r.id === parseInt(id));

    if (!restaurant) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Restaurant not found'
      });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

const createRestaurant = (req, res) => {
  try {
    const { name, description, cuisine_type, address, phone, opening_time, closing_time } = req.body;

    if (!name || !address) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Name and address are required'
      });
    }

    const newRestaurant = {
      id: restaurants.length + 1,
      owner_id: req.user.id,
      name,
      description,
      cuisine_type,
      address,
      phone,
      opening_time,
      closing_time,
      rating: 0,
      total_ratings: 0,
      is_open: true,
      delivery_fee: 50,
      min_order_amount: 200,
      avg_delivery_time: 30
    };

    restaurants.push(newRestaurant);

    res.status(201).json({
      message: 'Restaurant created successfully',
      restaurant: newRestaurant
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant
};