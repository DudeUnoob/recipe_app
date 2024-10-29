// src/api/api.gateway.ts
import express, { application, Request, Response } from "express";
import { ServiceBroker } from "moleculer";
import AIService from "../services/ai.service";
import EnhanceRecipeService from "../services/enhanceRecipe.service"
import GenerateRecipeService from "../services/generateRecipe.service";
import GetNutritionalAnalysisService from "../services/getNutritionalAnalysis.service";
import GetPersonalizedRecommendations from "../services/getPersonalizedRecommendations.service";
import cors from "cors"

// Create an Express app and Moleculer broker
const app = express();
const broker = new ServiceBroker({ });
broker.createService(AIService);
broker.createService(EnhanceRecipeService);
broker.createService(GenerateRecipeService);
broker.createService(GetNutritionalAnalysisService);
broker.createService(GetPersonalizedRecommendations);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

// Route to get user by ID
app.get("/api/user/:id", async (req: Request, res: Response) => {
  try {
    const user = await broker.call("aiService.getUser", { id: req.params.id });
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).send("Error fetching user");
  }
});


app.post('/api/generateRecipe', async(req: Request, res: Response) => {
    try{
        const data = await broker.call("generateRecipe.generateRecipe", 
            { ingredients: req.body.ingredients, userPreferences: req.body.userPreferences }
        )
        if(!data) return res.status(404).send("Error with your input")
        
        res.json(data)
    }

    catch(err) {
        res.status(500).send("Error generating recipe");
    }
})

app.post("/api/enhanceRecipe", async(req: Request, res: Response) => {
    try{
        const data = await broker.call("enhanceRecipe.enhanceRecipe",
            {
                recipeToEnhance: req.body.recipeToEnhance,
                userPreferences: req.body.userPreferences
            }
        )

        if(!data) return res.status(404).send("Error with your input")

        res.json(data)
    }
    catch(err) {
        res.status(500).send("Error enhancing recipe")
    }
})

app.post("/api/getPersonalizedRecommendations", async(req: Request, res: Response) => {

    try {
        const data = await broker.call("getPersonalizedRecommendations.getPersonalizedRecommendations", 
            {
                user_id: req.body.user_id,
                userPreferences: req.body.userPreferences,
            }
        )

        if(!data) return res.status(404).send("Error with your input")

        res.json(data)
    }

    catch(err) {

        res.status(500).send("Error getting personalized reccomendations")
    }
})

app.post("/api/getNutritionalAnalysis", async(req: Request, res: Response) => {

    try {
        const data = await broker.call("getNutritionalAnalysis.getNutritionalAnalysis", 
            {
                finalRecipe: req.body.finalRecipe
            }
        )

        if(!data) return res.status(404).send("Error getting input")

        res.json(data)
    }
    catch(err) {
        res.status(500).send("Error getting nutritional analysis")
    }
})

export { app, broker };
