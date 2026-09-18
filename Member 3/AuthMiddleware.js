// JWT token verify 
// Member 3 - Mansora Akther Mim (202104028)
// Note: match with Member 1 JWT secret

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'househub_secret_key';

// Login check 
function authRequired(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Login please, Token not found' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, name, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid or expired।" });
  }
}

// Specific role check
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'not permitable' });
    }
    next();
  };
}

module.exports = { authRequired, requireRole };
