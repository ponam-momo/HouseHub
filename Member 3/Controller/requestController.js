// controllers/requestController.js
// Interest Request & Approval Module - Controller
// Member 3 - Mansora Akther Mim (202104028)

const db = require('../config/db');

// POST /api/requests
// Tenant send interest to a listing
const sendRequest = async (req, res) => {
  try {
    const tenant_id = req.user.id; //   user id from JWT
    const { listing_id } = req.body;

    if (!listing_id) {
      return res.status(400).json({ error: ' need listing_id ।' });
    }

    // Listing  check
    const [listings] = await db.execute(
      `SELECT * FROM listings WHERE id = ? AND status = 'available'`,
      [listing_id]
    );

    if (listings.length === 0) {
      return res.status(404).json({ error: 'Listing not available' });
    }

    const listing = listings[0];

    // Owner can not send request to his own listing 
    if (listing.owner_id === tenant_id) {
      return res.status(400).json({ error: 'not valid request to own listing' });
    }

    // Already pending request check
    const [existing] = await db.execute(
      `SELECT * FROM requests WHERE listing_id = ? AND tenant_id = ? AND status = 'pending'`,
      [listing_id, tenant_id]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: 'Already requestedto this listing ' });
    }

    // Request 
    await db.execute(
      `INSERT INTO requests (listing_id, tenant_id, status, created_at)
       VALUES (?, ?, 'pending', NOW())`,
      [listing_id, tenant_id]
    );

    res.status(201).json({ success: true, message: 'Request successful' });
  } catch (err) {
    console.error('Send request error:', err);
    res.status(500).json({ error: ' Error Request' });
  }
};

// GET /api/requests/my-requests
// Tenant can see his all own request
const getMyRequests = async (req, res) => {
  try {
    const tenant_id = req.user.id;

    const [requests] = await db.execute(
      `SELECT 
        r.id,
        r.status,
        r.created_at,
        l.id AS listing_id,
        l.title,
        l.location,
        l.price,
        l.room_type,
        u.name AS owner_name,
        (SELECT image_url FROM listing_images WHERE listing_id = l.id LIMIT 1) AS image
       FROM requests r
       JOIN listings l ON r.listing_id = l.id
       JOIN users u ON l.owner_id = u.id
       WHERE r.tenant_id = ?
       ORDER BY r.created_at DESC`,
      [tenant_id]
    );

    //if  Accepted show  owner  contact ে
    const result = requests.map((req) => {
      if (req.status === 'accepted') {
        return req; //  contact already  from join 
      }
      return req;
    });

    res.status(200).json({ success: true, requests: result });
  } catch (err) {
    console.error('Get my requests error:', err);
    res.status(500).json({ error: 'error to send Requests ' });
  }
};

// GET /api/requests/owner-requests
// Owner can see all request in listing ে
const getOwnerRequests = async (req, res) => {
  try {
    const owner_id = req.user.id;

    const [requests] = await db.execute(
      `SELECT 
        r.id,
        r.status,
        r.created_at,
        l.id AS listing_id,
        l.title,
        l.location,
        l.price,
        u.id AS tenant_id,
        u.name AS tenant_name,
        u.email AS tenant_email,
        u.phone AS tenant_phone
       FROM requests r
       JOIN listings l ON r.listing_id = l.id
       JOIN users u ON r.tenant_id = u.id
       WHERE l.owner_id = ?
       ORDER BY r.created_at DESC`,
      [owner_id]
    );

    res.status(200).json({ success: true, requests });
  } catch (err) {
    console.error('Get owner requests error:', err);
    res.status(500).json({ error: 'Requests error' });
  }
};

// PUT /api/requests/:id
// Owner can  Accept or Reject a request
const respondToRequest = async (req, res) => {
  try {
    const owner_id = req.user.id;
    const request_id = req.params.id;
    const { action } = req.body; // 'accepted' or 'rejected'

    if (!['accepted', 'rejected'].includes(action)) {
      return res.status(400).json({ error: "action would be 'accepted' or 'rejected'" });
    }

    // Request from owner  listing  verifying
    const [rows] = await db.execute(
      `SELECT r.*, l.owner_id 
       FROM requests r 
       JOIN listings l ON r.listing_id = l.id
       WHERE r.id = ?`,
      [request_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Request can not found' });
    }

    if (rows[0].owner_id !== owner_id) {
      return res.status(403).json({ error: 'such request not permittable to manage ' });
    }

    if (rows[0].status !== 'pending') {
      return res.status(400).json({ error: ' request already processed ' });
    }

    // Update status
    await db.execute(`UPDATE requests SET status = ? WHERE id = ?`, [action, request_id]);

    res.status(200).json({
      success: true,
      message: `Request successfully ${action === 'accepted' ? 'Accept' : 'Reject'}`,
    });
  } catch (err) {
    console.error('Respond to request error:', err);
    res.status(500).json({ error: 'To Response' });
  }
};

// DELETE /api/requests/:id
// Tenant can cancel his wn pending request 
const cancelRequest = async (req, res) => {
  try {
    const tenant_id = req.user.id;
    const request_id = req.params.id;

    const [rows] = await db.execute(
      `SELECT * FROM requests WHERE id = ? AND tenant_id = ?`,
      [request_id, tenant_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Request can not found' });
    }

    if (rows[0].status !== 'pending') {
      return res.status(400).json({ error: 'can not be cancelled without Pending request ' });
    }

    await db.execute(`DELETE FROM requests WHERE id = ?`, [request_id]);

    res.status(200).json({ success: true, message: 'Request cancelled' });
  } catch (err) {
    console.error('Cancel request error:', err);
    res.status(500).json({ error: 'error to cancel request ' });
  }
};

module.exports = {
  sendRequest,
  getMyRequests,
  getOwnerRequests,
  respondToRequest,
  cancelRequest,
};
