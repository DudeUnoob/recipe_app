// index.ts
import express from 'express';
import dotenv from 'dotenv';
import { broker, app } from "./api/api.gateway";

// Load environment variables
dotenv.config();

const port: any = process.env.PORT || 3000;

// Start Moleculer broker
broker.start()
  .then(() => {
    // Start Express server
    app.listen(port, '0.0.0.0', () => {
      console.log(`API Gateway listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start services:", err);
    process.exit(1); // Exit if broker fails to start
  });

  // const client = new Groq({
  //   apiKey: process.env.AI_KEY
  // })
// const app = express();
// app.use(express.json());

// app.get('/api/recipes', async (req, res) => {
//   // const recipes = await getRecipeData();
//   // res.json(recipes);
// });

// app.post('/api/generate-recipe', async (req, res) => {
//   // const { prompt } = req.body;
//   // const generatedRecipe = await generateRecipe(prompt);
//   // res.json({ recipe: generatedRecipe });
// });

// app.get("/", async(req, res) => {

//   const chatCompletion = await client.chat.completions.create({
//     messages: [{ role: 'user', content: 'Give me some pizza recipes' }],
//     model: 'llama3-8b-8192',
//   });

//   return res.status(200).json({
//     message: chatCompletion.choices[0].message.content
//   })
// })

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
