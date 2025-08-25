require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const insumosRoutes = require('./insumos');

console.log('Servidor SQL:', process.env.DB_SERVER);

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', authRoutes);
app.use('/api', insumosRoutes);

// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
