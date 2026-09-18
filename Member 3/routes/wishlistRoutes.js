// routes/wishlistRoutes.js
// Wishlist Module - Routes
// Member 3 - Mansora Akther Mim (202104028)

const express = require('express');
const router = express.Router();
const { toggleWishlist, getMyWishlist, checkWishlist } = require('../controllers/wishlistController');
const { authRequired, requireRole } = require('../middleware/authMiddleware');

// GET /api/wishlist — show me all saved listings 
router.get('/', authRequired, requireRole('tenant'), getMyWishlist);

// GET /api/wishlist/check/:listing_id — if any listing save here
router.get('/check/:listing_id', authRequired, requireRole('tenant'), checkWishlist);

// POST /api/wishlist/:listing_id — Add or Remove (toggle)
router.post('/:listing_id', authRequired, requireRole('tenant'), toggleWishlist);

module.exports = router;
