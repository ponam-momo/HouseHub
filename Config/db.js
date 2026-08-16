// config/db.js
// MySQL database connection
// Member 3 - Mansora Akther Mim (202104028)

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'househub',
  waitForConnections: true,
  connectionLimit: 10,
});

// promisify for  async/await 
const db = pool.promise();

module.exports = db;
