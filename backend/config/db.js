// db.js
const { Pool } = require('pg');
require('cors').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool;