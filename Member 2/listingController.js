// listingController.js — Listing business logic
// Member 2

const db = require('../Config/db');

// POST /api/listings — notun listing add
async function createListing(req, res) {
  try {
    const { title, description, location, price, room_type, bedrooms, amenities } = req.body;
    const owner_id = req.user.id; // authRequired middleware theke ashbe

    if (!title || !location || !price || !room_type) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const [result] = await db.query(
      `INSERT INTO listings (owner_id, title, description, location, price, room_type, bedrooms, amenities)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [owner_id, title, description, location, price, room_type, bedrooms || 1, amenities || '']
    );

    const listingId = result.insertId;

    if (req.files && req.files.length > 0) {
      const imageRows = req.files.map((f) => [listingId, `/uploads/${f.filename}`]);
      await db.query('INSERT INTO listing_images (listing_id, image_url) VALUES ?', [imageRows]);
    }

    res.status(201).json({ message: 'Listing created', listingId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while creating listing' });
  }
}

// GET /api/listings — shob listing dekhabe
async function getAllListings(req, res) {
  try {
    const [rows] = await db.query(
      `SELECT l.*, u.name AS owner_name
       FROM listings l JOIN users u ON l.owner_id = u.id
       WHERE l.status = 'available' ORDER BY l.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching listings' });
  }
}

// GET /api/listings/:id — ekta listing er full details + images
async function getListingById(req, res) {
  try {
    const { id } = req.params;
    const [[listing]] = await db.query('SELECT * FROM listings WHERE id = ?', [id]);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    const [images] = await db.query('SELECT image_url FROM listing_images WHERE listing_id = ?', [id]);
    listing.images = images.map((i) => i.image_url);

    res.json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching listing' });
  }
}

// PUT /api/listings/:id — nijer listing update
async function updateListing(req, res) {
  try {
    const { id } = req.params;
    const owner_id = req.user.id;
    const { title, description, location, price, room_type, bedrooms, amenities, status } = req.body;

    const [result] = await db.query(
      `UPDATE listings SET title=?, description=?, location=?, price=?, room_type=?, bedrooms=?, amenities=?, status=?
       WHERE id=? AND owner_id=?`,
      [title, description, location, price, room_type, bedrooms, amenities, status, id, owner_id]
    );

    if (result.affectedRows === 0) {
      return res.status(403).json({ error: 'Not allowed or listing not found' });
    }
    res.json({ message: 'Listing updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while updating listing' });
  }
}

// DELETE /api/listings/:id — nijer listing delete
async function deleteListing(req, res) {
  try {
    const { id } = req.params;
    const owner_id = req.user.id;

    const [result] = await db.query('DELETE FROM listings WHERE id=? AND owner_id=?', [id, owner_id]);
    if (result.affectedRows === 0) {
      return res.status(403).json({ error: 'Not allowed or listing not found' });
    }
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while deleting listing' });
  }
}

module.exports = {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
};