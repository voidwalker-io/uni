// server.js
'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Statische Dateien (Frontend)
app.use(express.static(path.join(__dirname, 'public')));

// API-Endpunkt für Fragen
app.get('/api/questions', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'questions.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Fehler beim Lesen der questions.json:', err);
      return res.status(500).json({ error: 'Fragen konnten nicht geladen werden.' });
    }

    try {
      const questions = JSON.parse(data);
      res.json(questions);
    } catch (parseErr) {
      console.error('Fehler beim Parsen der questions.json:', parseErr);
      res.status(500).json({ error: 'Ungültiges Format der questions.json.' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Recht-Quiz läuft auf http://localhost:${PORT}`);
});
