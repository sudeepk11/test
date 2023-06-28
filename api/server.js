const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// cors for cross origin stuff!!
app.use(cors());

// function to get imgs
app.get('/api/flickr', async (req, res) => {
  try {
    const response = await axios.get(
      'http://api.flickr.com/services/feeds/photos_public.gne?format=json'
    );
    const jsonString = response.data.substring(15, response.data.length - 1);
    const jsonData = JSON.parse(jsonString);
    res.json(jsonData);
  } catch (error) {
    console.error('error!!', error);
    res.status(500).json({ error: 'failed' });
  }
});

// server start
app.listen(4200, () => {
  console.log('Server is running on port 4200');
});

