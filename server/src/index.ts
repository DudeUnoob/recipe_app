// src/server/index.ts
import express from 'express';
import { Pool } from 'pg';
import { config } from 'dotenv';

config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
//app duplicatedata.json());

// Routes
app.get('/api/recipes', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM recipes');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', async(req, res) => {
    res.send('Hello World!')
})

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});