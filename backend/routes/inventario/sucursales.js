const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../../db/config');

router.post('/inventario/sucursal', async (req, res) => {
    try {
    const pool = await poolPromise;
    const { numtda } = req.body;

    if (numtda === null || numtda === undefined) {
      return res.status(400).json({ error: 'El número de tienda (numtda) es requerido.' });
    }

    const result = await pool.request()
      .input('numtda', sql.Int, numtda) 
      .query('SELECT * FROM HMI_InventarioSucursales WHERE numtda = @numtda');

    console.log('Datos del inventario 1:', result.recordset);

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/inventario/guardarCambios', async (req, res) => {
    try {
        const payload = req.body;

        console.log('Payload recibido para INSERCIÓN:', payload);

        if (!Array.isArray(payload) || payload.length === 0) {
            return res.status(400).json({ error: 'El cuerpo de la solicitud debe ser un array no vacío.' });
        }

        const pool = await poolPromise;
        const transaction = new sql.Transaction(pool);
        await transaction.begin();

        try {
            for (const item of payload) {
                const { numtda, modelo, piezas, insumo } = item;

                const request = new sql.Request(transaction);
                await request
                    .input('numtda', sql.Int, numtda)
                    .input('modelo', sql.NVarChar, modelo) 
                    .input('piezas', sql.Int, piezas)
                    .input('insumo', sql.NVarChar, insumo)
                    .query(`
                        UPDATE HMI_InventarioSucursales
                        SET Piezas = @piezas, FechaRegistro = GETDATE()
                        WHERE numtda = @numtda AND Insumo = @insumo AND Modelo = @modelo;
                    `);
            }

            await transaction.commit();
            res.status(201).json({ message: 'Registros de inventario insertados con éxito.' });

        } catch (err) {
            await transaction.rollback();
            console.error('Error durante la transacción de inserción:', err);
            res.status(500).json({ error: 'Fallo al insertar los registros. ' + err.message });
        }

    } catch (err) {
        console.error('Error al recibir el payload:', err);
        res.status(500).json({ error: 'Fallo al procesar la solicitud. ' + err.message });
    }
});


module.exports = router;