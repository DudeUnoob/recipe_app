// src/scripts/migrate-data.ts
import { Pool } from 'pg';
import { parse } from 'csv-parse';
import fs from 'fs';
import { config } from 'dotenv';

config();

const pool = new Pool({
  connectionString: "",
});

async function migrateData() {
  const parser = fs.createReadStream('../server/data/RAW_recipes.csv').pipe(parse({
    columns: true,
    skip_empty_lines: true
  }));

  for await (const record of parser) {
    const query = `
      INSERT INTO recipes (name, id, minutes, contributor_id, submitted, tags, nutrition, n_steps, steps, description, ingredients, n_ingredients)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;

    const values = [
      record.name,
      record.id,
      parseInt(record.minutes),
      record.contributor_id,
      new Date(record.submitted),
      record.tags,
      record.nutrition,
      parseInt(record.n_steps),
      record.steps,
      record.description,
      record.ingredients,
      parseInt(record.n_ingredients)
    ];

    try {
      await pool.query(query, values);
      console.log(`Inserted recipe: ${record.name}`);
    } catch (err) {
      console.error(`Error inserting recipe ${record.name}:`, err);
    }
  }

  console.log('Data migration completed');
  pool.end();
}

migrateData();