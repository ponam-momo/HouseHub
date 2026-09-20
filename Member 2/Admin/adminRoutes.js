// adminRoutes.js — Admin Dashboard Routes

const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getAllListingsAdmin,
  toggleBlockUser,
  deleteListingAdmin,
} = require('./adminController');
const { authRequired, requireAdmin } = require('./adminAuth');

// GET /api/admin/users — shob user dekhano
router.get('/users', authRequired, requireAdmin, getAllUsers);

// GET /api/admin/listings — shob listing dekhano
router.get('/listings', authRequired, requireAdmin, getAllListingsAdmin);

// PUT /api/admin/users/:id/block — user block/unblock
router.put('/users/:id/block', authRequired, requireAdmin, toggleBlockUser);

// DELETE /api/admin/listings/:id — admin je kono listing delete korbe
router.delete('/listings/:id', authRequired, requireAdmin, deleteListingAdmin);

module.exports = router;