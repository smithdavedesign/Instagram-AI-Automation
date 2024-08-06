const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data'); // Import FormData package
const dotenv = require('dotenv');
dotenv.config();

async function fineTuneLoRa(imagePath, parameters) {
  const url = 'https://api.modelslab.com/v1/lora-finetune'; // Replace with the actual endpoint
  const apiKey = process.env.DIFFUSION_API_KEY; // Get the API key from the .env file
  console.info(apiKey)

  if (!apiKey) {
    console.error('API key is not defined. Please add it to your .env file.');
    return;
  }

  // Read the image file
  const image = fs.readFileSync(imagePath);

  // Create a form data
  const formData = new FormData();
  formData.append('image', image, path.basename(imagePath));
  for (const key in parameters) {
    formData.append(key, parameters[key]);
  }

  try {
    const response = await axios.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${apiKey}`
      }
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Example usage
const imagePath = './path/to/your/image.jpg';
const parameters = {
  param1: 'value1',
  param2: 'value2',
  // Add other parameters as needed
};

fineTuneLoRa(imagePath, parameters);
