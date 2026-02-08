/**
 * Server-side Gemini API Proxy (Node.js/Express Example)
 * Deploy this to your backend server (e.g., Vercel, Netlify Functions, AWS Lambda)
 * 
 * Installation:
 * npm install express dotenv
 * 
 * Usage:
 * node api-proxy.js
 */

const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

app.post('/api/gemini', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'API key not configured' });
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                })
            }
        );

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            throw new Error('Empty response from Gemini API');
        }

        res.json({ text });
    } catch (error) {
        console.error('Gemini proxy error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Gemini API proxy running on port ${PORT}`);
});
