import express from 'express';
import { Configuration, OpenAIApi } from 'openai';

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Recommend a product based on the following message: ${message}`,
            max_tokens: 150,
        });

        res.json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ message: 'Error with AI Chatbot' });
    }
});

export default router;
