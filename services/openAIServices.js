require('dotenv').config();
const axios = require('axios');

async function generateImageFromText(prompt) {
  const url = 'https://api.openai.com/v1/images/generations';
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('API key is not defined. Please add it to your .env file.');
    return;
  }

  const data = {
    prompt: prompt,
    n: 1,
    size: "1024x1024" // You can adjust the size as needed
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const imageUrl = response.data.data[0].url;
    console.log('Generated Image URL:', imageUrl);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Example usage
const prompt = 'A futuristic cityscape at sunset with flying cars and skyscrapers';
generateImageFromText(prompt);
