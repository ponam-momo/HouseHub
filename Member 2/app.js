// app.js — HouseHub (Listing module standalone test server)

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ─────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve uploaded listing images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes — Member 2 (Listing CRUD) ────────────
app.use('/api/listings', require('./listingRoutes'));

// ── Root route ───────────────────────────────────
app.get('/', (req, res) => {
  res.send('Listing module running ');
});

// ── Start server ─────────────────────────────────
app.listen(PORT, () => {
  console.log(` Listing module server running at http://localhost:${PORT}`);
});
