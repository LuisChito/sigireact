const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db/config');

router.post('/login', async (req, res) => {
    const { usuario, password } = req.body;

    try {
        const pool = await poolPromise;
        
        // Primera consulta para verificar las credenciales
        const result = await pool.request()
            .input('usuario', sql.VarChar, usuario)
            .input('contrasenia', sql.VarChar, password)
            .query(`
                SELECT * FROM IntraUsuario 
                WHERE Usuario = @usuario AND Contrasenia = @contrasenia
            `);
            
        if (result.recordset.length > 0) {
            const usuarioData = result.recordset[0];
            let numtda = null; 

            // Segunda consulta para obtener el número de tienda, independientemente del perfil
            const tiendaResult = await pool.request()
                .input('nombreSucursal', sql.VarChar, usuarioData.Usuario)
                .query(`
                    SELECT Sucursal FROM IntraUsuario WHERE Usuario = @nombreSucursal;
                `);

            // Si se encuentra la tienda, asigna el número a numtda
            if (tiendaResult.recordset.length > 0) {
                // Se utiliza el nombre correcto de la columna: 'Sucursal'
                numtda = tiendaResult.recordset[0].Sucursal; 
            }

            // Envía la respuesta con los datos del usuario y el número de tienda
            res.status(200).json({
                success: true,
                message: 'Login exitoso',
                usuario: usuarioData.Usuario,
                perfil: usuarioData.Perfil,
                numtda: numtda 
            });
        } else {
            // Si las credenciales son incorrectas, envía un error 401
            res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

    } catch (err) {
        // Manejo de errores del servidor
        console.error('Error en login:', err);
        res.status(500).json({
            success: false,
            message: 'Error del servidor',
            error: err.message
        });
    }
});

module.exports = router;