
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const categoriaRoutes = require('./routes/categorias');
const productoRoutes = require('./routes/productos');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.get('/api', (req, res) => {
  res.send('¡El backend de TecnoFarma está funcionando!');
});

app.use('/api/categorias', categoriaRoutes);
app.use('/api/productos', productoRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal en el servidor!');
});


app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
