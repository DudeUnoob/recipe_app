import express from 'express';
import { generateRecipe } from './api/recipe';
// import Groq from 'groq-sdk';
//import { getRecipeData } from "./db";
import dotenv from 'dotenv';
import { broker, app } from "./api/api.gateway";
import { supabase } from './scripts/supabase';
import { client } from './functions/groq';


const envPath = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envPath });



// src/index.ts


const PORT = 3000;
const port: any = process.env.PORT || 3000


// Start Moleculer broker
broker.start()
  .then(() => {
    // Start Express server

    app.listen(port, '::', () => {
      console.log(`API Gateway listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Failed to start services:", err));


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
