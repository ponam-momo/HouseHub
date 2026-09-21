// Member 1/profile.js
// Profile view + update
// Member 1 - User Profile Management

const express = require('express');
const db = require('../Config/db');
const { authRequired } = require('../Member 3/AuthMiddleware');

const router = express.Router();

// GET profile -own information
router.get('/profile', authRequired, async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(users[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

// PUT profile — name/phn num updating
router.put('/profile', authRequired, async (req, res) => {
  try {
    const { name, phone } = req.body;

    await db.query(
      'UPDATE users SET name = ?, phone = ? WHERE id = ?',
      [name, phone, req.user.id]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

module.exports = router;