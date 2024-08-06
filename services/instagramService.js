const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const accessToken = process.env.IG_TOKEN;
const apiUrl = 'https://graph.instagram.com/v13.0';

async function postPhoto() {
  const photoUrl = 'https://example.com/photo.jpg';
  const caption = 'Hello, world!';

  const response = await axios.post(`${apiUrl}/me/media`, {
    image_url: photoUrl,
    caption,
    access_token: accessToken,
  });

  console.log(response.data);
}

postPhoto();