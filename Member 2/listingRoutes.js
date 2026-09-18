// listingRoutes.js — Listing Management Module - Routes
// Member 2 - Foujia Akther (202204009)

const express = require('express');
const router = express.Router();
const {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
} = require('./listingController');
const { authRequired, requireRole } = require('./tempAuth');
const upload = require('./uploadMiddleware');

// GET /api/listings — shobai dekhte parbe, login lagbe na
router.get('/', getAllListings);

// GET /api/listings/:id — details page
router.get('/:id', getListingById);

// POST /api/listings — shudhu owner, image shoho
router.post('/', authRequired, requireRole('owner'), upload.array('images', 5), createListing);

// PUT /api/listings/:id — shudhu owner, nijer listing
router.put('/:id', authRequired, requireRole('owner'), updateListing);

// DELETE /api/listings/:id — shudhu owner, nijer listing
router.delete('/:id', authRequired, requireRole('owner'), deleteListing);

module.exports = router;