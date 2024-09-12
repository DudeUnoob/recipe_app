import express from 'express';
import { generateRecipe } from './api/recipe';
import { getRecipeData } from "./db";

const app = express();
app.use(express.json());

app.get('/api/recipes', async (req, res) => {
  const recipes = await getRecipeData();
  res.json(recipes);
});

app.post('/api/generate-recipe', async (req, res) => {
  const { prompt } = req.body;
  const generatedRecipe = await generateRecipe(prompt);
  res.json({ recipe: generatedRecipe });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
