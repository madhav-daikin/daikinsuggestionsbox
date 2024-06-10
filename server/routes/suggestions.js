const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// MySQL connection
const db = mysql.createConnection({
    host: 'daikinsuggestionsbox.cj7yyqs8hti1.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'fFEp5Nle]TzQYu{J8VQp|<TCgzOy',
    database: 'daikinsuggestionsbox',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Create a new suggestion
router.post('/', (req, res) => {
    const { topic, subject, suggestion, rating1, rating2 } = req.body;
    const query = 'INSERT INTO suggestions (topic, subject, suggestion, rating1, rating2) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [topic, subject, suggestion, rating1, rating2], (err, result) => {
        if (err) {
            console.error('Error inserting suggestion:', err);
            res.status(500).json({ error: 'Failed to submit suggestion' });
            return;
        }
        res.json({ id: result.insertId, topic, subject, suggestion, rating1, rating2 });
    });
});

// Get all suggestions
router.get('/', (req, res) => {
    const query = 'SELECT * FROM suggestions';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching suggestions:', err);
            res.status(500).json({ error: 'Failed to fetch suggestions' });
            return;
        }
        res.json(results);
    });
});

module.exports = router;
