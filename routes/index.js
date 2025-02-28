const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS para permitir solicitudes desde tu dominio
app.use(cors({
  origin: 'https://torrey.store'
}));

app.use(express.json());

// Ruta para manejar las solicitudes a Tresguerras
app.post('/cotizacion', async (req, res) => {
  try {
    const tresguerrasApiUrl = 'https://intranet.tresguerras.com.mx/WS/api/Customer/JSON/?action=ApiCotizacion';

    const requestData = {
      ...req.body,
      Access_Usr: 'API00162',
      Access_Pass: 'VVZaQ1NrMUVRWGhPYWtwRVZEQTFWVlZyUmxSU1kwOVNVVlZHUkZaR1RrSlRNRlph'
    };

    const response = await fetch(tresguerrasApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    });

    const data = await response.json();

    if (data && data.return) {
      res.json({
        total: data.return.total || 0,
        dias_transito: data.return.dias_transito || 'N/A'
      });
    } else {
      res.status(500).json({ error: 'Respuesta inesperada de Tresguerras' });
    }
  } catch (error) {
    console.error('Error en el proxy:', error);
    res.status(500).json({ error: 'Error al conectar con Tresguerras' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
