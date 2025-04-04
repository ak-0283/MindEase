const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { OpenAI } = require('openai');

const app = express();
<<<<<<< HEAD
const port = 5000;
=======
const PORT = process.env.PORT || 5000;
>>>>>>> 9a559b169bac7bc591656f24c39c54843c6d5c20

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// ✅ Initialize OpenAI (v4+ way)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
=======
// Serve the main HTML file
app.get('/', (req, res) => {
    // res.send('Backend is working!');
  res.sendFile(path.join(__dirname, '../frontend/chatbot.js'));
>>>>>>> 9a559b169bac7bc591656f24c39c54843c6d5c20
});

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
        });

        const reply = chatCompletion.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error('❌ OpenAI API Error:', error);
        res.status(500).json({
            error: 'Failed to get response',
            details: error,
        });
    }
<<<<<<< HEAD
=======

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: message }] }],
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const botReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't understand that.";
    res.json({ reply: botReply });

  } catch (error) {
    console.error('Error calling Gemini API:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to get response',
      details: error.response?.data || error.message,
    });
  }
>>>>>>> 9a559b169bac7bc591656f24c39c54843c6d5c20
});

app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});