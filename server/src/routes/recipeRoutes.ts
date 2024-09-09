// server/src/routes/recipeRoutes.js
// const express = require('express');
// const axios = require('axios');

// const router = express.Router();

import express from "express"
import axios from "axios"

const router = express.Router()

// Route to summarize recipe steps
router.post('/summarize', async (req, res) => {
    const { steps } = req.body;

    try {
        // Send request to AI service
        const response = await axios.post('http://localhost:5001/summarize_recipe', {
            steps: steps.join(' ')
        });

        const summary = response.data.summary;
        res.json({ summary });
    } catch (error) {
        console.error('Error summarizing recipe steps:', error);
        res.status(500).send('Internal Server Error');
    }
});

// server/src/routes/recipeRoutes.js

router.post('/recommend', async (req, res) => {
    const { recipe_name } = req.body;

    try {
        // Send request to AI service for recommendations
        const response = await axios.post('http://localhost:5001/recommend_recipe', {
            recipe_name
        });

        const recommendations = response.data.recommendations;
        res.json({ recommendations });
    } catch (error) {
        console.error('Error getting recipe recommendations:', error);
        res.status(500).send('Internal Server Error');
    }
});


export default router;
