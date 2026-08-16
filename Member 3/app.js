// app.js — HouseHub Main Serverে

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Static files (HTML pages) ──────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── Routes — Member 1 (Auth, Admin) ───────────────────────────
// app.use('/api/auth',  require('./routes/authRoutes'));    // Member 1
// app.use('/api/admin', require('./routes/adminRoutes'));   // Member 1
// app.use('/api/listings', require('./routes/listingRoutes')); // Member 2

// ── Routes — Member 3 (Search, Requests, Wishlist) ────────────
app.use('/api/search',   require('./routes/searchRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));

// ── Root route ─────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

// ── Start server ───────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ HouseHub server running at http://localhost:${PORT}`);
});
