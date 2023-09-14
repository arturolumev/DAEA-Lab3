const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Puedes cambiar el puerto según tus preferencias
const TENOR_API_KEY = 'LIVDSRZULELA'; // Reemplaza con tu clave de API de Tenor

app.get('/api/:keyword', async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const response = await axios.get('https://api.tenor.com/v1/search', {
      params: {
        key: TENOR_API_KEY,
        q: keyword,
        limit: 10, // Puedes ajustar la cantidad de resultados que deseas
      },
    });

    const gifUrls = response.data.results.map((result) => result.media[0].gif.url);
    res.json({ gifs: gifUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un problema al obtener los GIFs' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
