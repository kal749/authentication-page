const sqlite = require('node:sqlite');
const path = require('path');

const db = new sqlite.DatabaseSync(path.join(__dirname, 'mydatabase.sqlite'));

// Create users table
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phonenumber TEXT,
        password TEXT
    )
`);

console.log(' Database created with users table');

module.exports = db;