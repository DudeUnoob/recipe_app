import Groq from 'groq-sdk';
import dotenv from 'dotenv';
// const envPath = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

// dotenv.config({ path: ".env" });

export const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

