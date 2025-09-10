// backend/routes/insumos.js
const express = require('express');
const router = express.Router();

router.post('/inventario/movimientos', (req, res) => {
    const payload = req.body;

    if (!payload || Object.keys(payload).length === 0) {
        return res.status(400).json({ error: 'Payload vacío.' });
    }

    console.log('Payload del carrito recibido:', payload);

    res.status(200).json({ mensaje: 'Payload recibido correctamente.' });
});

module.exports = router;