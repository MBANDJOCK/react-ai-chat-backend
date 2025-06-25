
import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const { messages } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: messages,
    });

    res.json({ response: completion.data.choices[0].message });
  } catch (error) {
    console.error('Error creating chat completion:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
