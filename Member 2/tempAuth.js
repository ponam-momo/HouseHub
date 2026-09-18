// tempAuth.js — TEMPORARY, testing er jonno
// Asol auth system thik howar por eta delete hobe

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'househub_secret_key';

function authRequired(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Login please, Token can't found" });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid or expired' });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'not permitable' });
    }
    next();
  };
}

module.exports = { authRequired, requireRole };