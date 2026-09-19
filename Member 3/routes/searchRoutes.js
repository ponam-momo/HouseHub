// routes/searchRoutes.js
// Search & Filter Module - Routes
// Member 3 - Mansora Akther Mim (202104028)

const express = require('express');
const router = express.Router();
const { searchListings, getListingById } = require('../controllers/searchController');

// GET /api/search?location=dhaka&minPrice=5000&maxPrice=15000&room_type=single+room&keyword=wifi
router.get('/', searchListings);

// GET /api/search/:id . one listing all details
router.get('/:id', getListingById);

module.exports = router;
