const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { OpenAI } = require('openai');
const axios = require('axios'); // Needed for Gemini API

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Optional: Serve chatbot.js if needed for testing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/chatbot.js'));
});

// ✅ Unified chat endpoint for both OpenAI and Gemini
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // === Option 1: Use OpenAI GPT ===
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
        });

        const reply = chatCompletion.choices[0].message.content;
        return res.json({ reply });

        // === Option 2: Use Gemini ===
        /*
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: userMessage }] }],
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        const botReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't understand that.";
        return res.json({ reply: botReply });
        */

    } catch (error) {
        console.error('❌ Chat API Error:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to get response',
            details: error.response?.data || error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
