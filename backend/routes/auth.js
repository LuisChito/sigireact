const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db/config');

router.post('/login', async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('usuario', sql.VarChar, usuario)
      .input('contrasenia', sql.VarChar, password)
      .query(`
        SELECT * FROM IntraUsuario 
        WHERE Usuario = @usuario AND Contrasenia = @contrasenia
      `);

    if (result.recordset.length > 0) {
      const usuarioData = result.recordset[0];

      res.status(200).json({
      success: true,
      message: 'Login exitoso',
      usuario: usuarioData.Usuario,
      perfil: usuarioData.Perfil
      });

    } else {
      res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({
      success: false,
      message: 'Error del servidor',
      error: err.message
    });
  }
});

module.exports = router;
