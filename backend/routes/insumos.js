// backend/routes/insumos.js
const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db/config');

router.post('/inventario/movimientos', async (req, res) => {
    const payload = req.body;

    if (!payload || !payload.lineas || payload.lineas.length === 0) {
        return res.status(400).json({ error: 'Payload vacío o estructura incorrecta.' });
    }

    console.log('Payload del carrito recibido:', payload);

    try {
        const pool = await poolPromise;
        const transaction = new sql.Transaction(pool);

        await transaction.begin();

        try {
            // Recorremos cada línea del array 'lineas' del payload
            for (const linea of payload.lineas) {
                const request = transaction.request();

                // Definimos los parámetros para la consulta, extrayendo los datos del objeto 'linea'
                request.input('insumoId', sql.Int, linea.insumoId);
                request.input('modeloId', sql.NVarChar, linea.modeloId);
                request.input('cantidad', sql.Int, linea.cantidad);

                // Consulta SQL de inserción en la tabla HMI_Modelo
                const query = `
                    UPDATE HMI_Modelo
                    SET Existencia = Existencia + @cantidad
                    WHERE Modelo = @modeloId;
                `;

                await request.query(query);
            }

            // Si todas las inserciones son exitosas, confirmamos la transacción
            await transaction.commit();
            res.status(200).json({ mensaje: 'Datos insertados correctamente en HMI_Modelo.' });

        } catch (err) {
            // Si hay un error, revertimos la transacción para no insertar datos incompletos
            await transaction.rollback();
            console.error('Error en la transacción:', err);
            res.status(500).json({ error: 'Error al procesar los datos de inventario.', details: err.message });
        }
    } catch (err) {
        console.error('Error al conectar con la base de datos:', err);
        res.status(500).json({ error: 'Error de conexión con la base de datos.', details: err.message });
    }
});

module.exports = router;