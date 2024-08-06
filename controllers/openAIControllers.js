require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/text-generate-image', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const { prompt } = req.body;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key is not defined. Please add it to your .env file.' });
  }

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const data = {
    prompt: prompt,
    n: 1,
    size: "1024x1024"
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/images/generations', data, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const imageUrl = response.data.data[0].url;
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
});

module.exports = router;
