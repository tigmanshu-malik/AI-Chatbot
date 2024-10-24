const express = require('express');
require('dotenv').config();

const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.API_KEY })

const app = express();
const port = 3000;

app.use(express.json());

app.post('/chat', async (req, res) => {

    const userMessage = req.body.message

    try {
        const completion = await groq.chat.completions.create({
            messages: [
              {
                role: "user",
                content: userMessage,
              },
            ],
            model: "llama3-8b-8192",
          })
        

        res.json({
            response: completion.choices[0].message.content,
        });

    } catch (error) {
        console.error('Error with Claude API:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
