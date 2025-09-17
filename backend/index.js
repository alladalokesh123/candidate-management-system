const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

//GET all candidates
app.get('/api/candidates', (req, res) => {
  db.all('SELECT * FROM candidates ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

//GET single candidate
app.get('/api/candidates/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM candidates WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Candidate not found' });
    res.json(row);
  });
});

// CREATE candidate
app.post('/api/candidates', (req, res) => {
  const { name, email, phone_number, current_status, resume_link } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

  const sql = `INSERT INTO candidates (name, email, phone_number, current_status, resume_link)
               VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [name, email, phone_number || null, current_status || null, resume_link || null], function (err) {
    if (err) {
      if (err.message && err.message.includes('SQLITE_CONSTRAINT: UNIQUE')) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: err.message });
    }
    // return the newly inserted record
    db.get('SELECT * FROM candidates WHERE id = ?', [this.lastID], (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json(row);
    });
  });
});

// UPDATE candidate
app.put('/api/candidates/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone_number, current_status, resume_link } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

  const sql = `UPDATE candidates
               SET name = ?, email = ?, phone_number = ?, current_status = ?, resume_link = ?
               WHERE id = ?`;
  db.run(sql, [name, email, phone_number || null, current_status || null, resume_link || null, id], function (err) {
    if (err) {
      if (err.message && err.message.includes('SQLITE_CONSTRAINT: UNIQUE')) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) return res.status(404).json({ error: 'Candidate not found' });

    db.get('SELECT * FROM candidates WHERE id = ?', [id], (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(row);
    });
  });
});

// DELETE candidate
app.delete('/api/candidates/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM candidates WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Candidate not found' });
    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Backend server running on http://localhost:${PORT}`)});
