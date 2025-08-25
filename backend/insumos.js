// backend/routes/insumos.js
const express = require('express');
const router = express.Router();
const { getPool } = require('./db/config');


router.get('/insumos', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .query('SELECT Insumo, Nombre, Descripcion FROM HMI_Insumos ORDER BY Insumo');

    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener insumos:', err);
    res.status(500).json({ error: 'Error al obtener insumos' });
  }
});

module.exports = router;
