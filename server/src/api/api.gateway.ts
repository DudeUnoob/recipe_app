import express, { Request, Response, NextFunction } from "express";
import { ServiceBroker } from "moleculer";
import rateLimit from "express-rate-limit";
import AIService from "../services/ai.service";
import EnhanceRecipeService from "../services/enhanceRecipe.service";
import GenerateRecipeService from "../services/generateRecipe.service";
import GetNutritionalAnalysisService from "../services/getNutritionalAnalysis.service";
import GetPersonalizedRecommendations from "../services/getPersonalizedRecommendations.service";
import cors from "cors";

// Create an Express app and Moleculer broker
const app = express();
const broker = new ServiceBroker({});

// Initialize services
broker.createService(AIService);
broker.createService(EnhanceRecipeService);
broker.createService(GenerateRecipeService);
broker.createService(GetNutritionalAnalysisService);
broker.createService(GetPersonalizedRecommendations);

const standardLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
});

const aiServiceLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, /* Limit each IP to 1 requests per minute for AI services (def need to play around with the
    rate limiting here)
    */
    message: "Too many AI requests from this IP, please try again after 1 minute",
    standardHeaders: true,
    legacyHeaders: false,
});

// CORS configuration
const corsOption = {
    origin: ['http://localhost:5173', 'https://recipe-app-nu-gules.vercel.app'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};

// Middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply standard rate limiting to all routes
app.use(standardLimiter);

// Error handling middleware
// const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
//     console.error(err.stack);
//     res.status(500).json({
//         error: "Internal Server Error",
//         message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
//     });
// };

// Route handlers
app.get("/api/user/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await broker.call("aiService.getUser", { id: req.params.id });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        next(err);
    }
});

// AI-intensive routes with stricter rate limiting
app.post('/api/generateRecipe', aiServiceLimiter, async(req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await broker.call("generateRecipe.generateRecipe", {
            ingredients: req.body.ingredients,
            userPreferences: req.body.userPreferences
        });
        if (!data) return res.status(404).json({ error: "Error with your input" });
        res.json(data);
    } catch (err) {
        next(err);
    }
});

app.post("/api/enhanceRecipe", aiServiceLimiter, async(req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await broker.call("enhanceRecipe.enhanceRecipe", {
            recipeToEnhance: req.body.recipeToEnhance,
            userPreferences: req.body.userPreferences
        });
        if (!data) return res.status(404).json({ error: "Error with your input" });
        res.json(data);
    } catch (err) {
        next(err);
    }
});

app.post("/api/getPersonalizedRecommendations", aiServiceLimiter, async(req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Hitting getPersonalized")
        const data = await broker.call("getPersonalizedRecommendations.getPersonalizedRecommendations", {
            user_id: req.body.user_id,
            userPreferences: req.body.userPreferences,
        });
        if (!data) return res.status(404).json({ error: "Error with your input" });
        res.json(data);
    } catch (err) {
        next(err);
    }
});

app.post("/api/getNutritionalAnalysis", aiServiceLimiter, async(req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await broker.call("getNutritionalAnalysis.getNutritionalAnalysis", {
            finalRecipe: req.body.finalRecipe
        });
        if (!data) return res.status(404).json({ error: "Error getting input" });
        res.json(data);
    } catch (err) {
        next(err);
    }
});

// Apply error handling middleware last
// app.use(errorHandler);

export { app, broker };