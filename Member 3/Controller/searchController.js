// controllers/searchController.js
// Search & Filter Module - Controller
// Member 3 - Mansora Akther Mim (202104028)

const db = require('../config/db');

// GET /api/search
// Query params: location, minPrice, maxPrice, room_type, keyword
const searchListings = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, room_type, keyword } = req.query;

    // Base SQL query — শুধু available listings দেখাবে
    let sql = `
      SELECT 
        l.id,
        l.title,
        l.description,
        l.location,
        l.price,
        l.room_type,
        l.bedrooms,
        l.amenities,
        l.status,
        l.created_at,
        u.name AS owner_name,
        (SELECT image_url FROM listing_images WHERE listing_id = l.id LIMIT 1) AS image
      FROM listings l
      JOIN users u ON l.owner_id = u.id
      WHERE l.status = 'available'
    `;

    const params = [];

    // Filter: location
    if (location && location.trim() !== '') {
      sql += ` AND l.location LIKE ?`;
      params.push(`%${location.trim()}%`);
    }

    // Filter: min price
    if (minPrice && !isNaN(minPrice)) {
      sql += ` AND l.price >= ?`;
      params.push(Number(minPrice));
    }

    // Filter: max price
    if (maxPrice && !isNaN(maxPrice)) {
      sql += ` AND l.price <= ?`;
      params.push(Number(maxPrice));
    }

    // Filter: room type (single room / full house / mess)
    if (room_type && room_type.trim() !== '') {
      sql += ` AND l.room_type = ?`;
      params.push(room_type.trim());
    }

    // Filter: keyword search (title বা description এ)
    if (keyword && keyword.trim() !== '') {
      sql += ` AND (l.title LIKE ? OR l.description LIKE ? OR l.location LIKE ?)`;
      const kw = `%${keyword.trim()}%`;
      params.push(kw, kw, kw);
    }

    sql += ` ORDER BY l.created_at DESC`;

    const [listings] = await db.execute(sql, params);

    res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search করতে সমস্যা হয়েছে।' });
  }
};

// GET /api/search/:id — Single listing details
const getListingById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      `SELECT 
        l.*,
        u.name AS owner_name,
        u.email AS owner_email,
        u.phone AS owner_phone
       FROM listings l
       JOIN users u ON l.owner_id = u.id
       WHERE l.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Listing পাওয়া যায়নি।' });
    }

    // Images আলাদা আনো
    const [images] = await db.execute(
      `SELECT image_url FROM listing_images WHERE listing_id = ?`,
      [id]
    );

    const listing = rows[0];
    listing.images = images.map((img) => img.image_url);

    res.status(200).json({ success: true, listing });
  } catch (err) {
    console.error('Get listing error:', err);
    res.status(500).json({ error: 'Listing details আনতে সমস্যা হয়েছে।' });
  }
};

module.exports = { searchListings, getListingById };
