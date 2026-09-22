// app.js — HouseHub (Listing + Admin + Auth module test server)

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ─────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve uploaded listing images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// serve admin frontend (login.html)
app.use('/admin', express.static(path.join(__dirname, 'Admin')));

// ── Routes — Member 1 (Auth: register/login) ──
app.use('/api/auth', require('../Member 1/auth'));

// ── Routes — Member 2 (Listing CRUD) ─────────
app.use('/api/listings', require('./listingRoutes'));

// ── Routes — Admin Dashboard ──────────────────
app.use('/api/admin', require('./Admin/adminRoutes'));

// ── Root route ──────────────────────────────
app.get('/', (req, res) => {
  res.send('Listing + Admin module running');
});

// ── Start server ─────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});