// routes/requestRoutes.js
// Interest Request Module - Routes
// Member 3 - Mansora Akther Mim (202104028)

const express = require('express');
const router = express.Router();
const {
  sendRequest,
  getMyRequests,
  getOwnerRequests,
  respondToRequest,
  cancelRequest,
} = require('../controllers/requestController');
const { authRequired, requireRole } = require('../middleware/authMiddleware');

// POST /api/requests — Tenant interest পাঠাবে
router.post('/', authRequired, requireRole('tenant'), sendRequest);

// GET /api/requests/my-requests — Tenant তার নিজের requests দেখবে
router.get('/my-requests', authRequired, requireRole('tenant'), getMyRequests);

// GET /api/requests/owner-requests — Owner তার listing এ আসা requests দেখবে
router.get('/owner-requests', authRequired, requireRole('owner'), getOwnerRequests);

// PUT /api/requests/:id — Owner accept/reject করবে
router.put('/:id', authRequired, requireRole('owner'), respondToRequest);

// DELETE /api/requests/:id — Tenant নিজের pending request cancel করবে
router.delete('/:id', authRequired, requireRole('tenant'), cancelRequest);

module.exports = router;
