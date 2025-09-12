const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbSource = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbSource, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to SQLite at', dbSource);

    const createTable = `
      CREATE TABLE IF NOT EXISTS candidates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone_number TEXT,
        current_status TEXT,
        resume_link TEXT
      );
    `;

    db.run(createTable, (err) => {
      if (err) {
        console.error('Failed to ensure candidates table exists:', err.message);
      } else {
        console.log('Candidates table is ready');
      }
    });
  }
});

// export the db object
module.exports = db;

