const cors = require('cors');

// server.js
import express from 'express';
import { JSONFileSync } from 'lowdb/node';
import { LowSync } from 'lowdb';

const adapter = new JSONFileSync('db.json');
const db = new LowSync(adapter);
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

db.defaults({ entries: [] }).write();

app.get('/api/entries', (req, res) => {
    const entries = db.get('entries').value();
    res.json(entries);
});

app.post('/api/entries', (req, res) => {
    const entry = req.body;
    db.get('entries').push(entry).write();
    res.json(entry);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});