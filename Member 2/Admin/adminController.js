// adminController.js — Admin Dashboard business logic

const db = require('../../Config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'househub_secret_key';

// POST /api/admin/login — admin email + password diye login
async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const [[admin]] = await db.query(
      'SELECT * FROM users WHERE email = ? AND role = ?',
      [email, 'admin']
    );

    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Login successful',
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during admin login' });
  }
}

// GET /api/admin/users — shob user dekhano
async function getAllUsers(req, res) {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, role, is_blocked, created_at FROM users'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching users' });
  }
}

// GET /api/admin/listings — shob listing dekhano
async function getAllListingsAdmin(req, res) {
  try {
    const [rows] = await db.query(
      `SELECT l.*, u.name AS owner_name 
       FROM listings l JOIN users u ON l.owner_id = u.id
       ORDER BY l.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching listings' });
  }
}

// PUT /api/admin/users/:id/block — user block/unblock kora
async function toggleBlockUser(req, res) {
  try {
    const { id } = req.params;

    const [[user]] = await db.query('SELECT is_blocked FROM users WHERE id = ?', [id]);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const newStatus = !user.is_blocked;
    await db.query('UPDATE users SET is_blocked = ? WHERE id = ?', [newStatus, id]);

    res.json({ message: newStatus ? 'User blocked' : 'User unblocked' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while updating user status' });
  }
}

// DELETE /api/admin/listings/:id — admin je kono listing delete korte parbe
async function deleteListingAdmin(req, res) {
  try {
    const { id } = req.params;

    const [result] = await db.query('DELETE FROM listings WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json({ message: 'Listing removed by admin' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while deleting listing' });
  }
}

module.exports = {
  getAllUsers,
  getAllListingsAdmin,
  toggleBlockUser,
  deleteListingAdmin,
  adminLogin,
};