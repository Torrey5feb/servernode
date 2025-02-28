const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Permite cualquier origen (puedes personalizarlo)
app.use(express.json());

// Ruta para el proxy
app.post('/proxy', async (req, res) => {
  try {
    const tresguerrasAPI = 'https://intranet.tresguerras.com.mx/WS/api/Customer/JSON/?action=ApiCotizacion';
    const response = await fetch(tresguerrasAPI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al conectar con la API de Tresguerras' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
