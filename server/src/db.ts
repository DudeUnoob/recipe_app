import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Your PostgreSQL URI
});

export const query = (text: string, params?: any[]) => pool.query(text, params);


export const getRecipeData = async () => {
    const queryText = 'SELECT name, steps, ingredients, description FROM recipes';
    const result = await query(queryText);
    return result.rows;
  };
  