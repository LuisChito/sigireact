const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '',
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE || '',
  port: 1433, // usamos el puerto TCP por defecto
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

// Log para confirmar que las variables se cargaron bien
console.log('DB CONFIG ->', {
  server: dbConfig.server,
  database: dbConfig.database,
  user: dbConfig.user,
  port: dbConfig.port,
});

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('✅ Conectado a SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('❌ Error de conexión a SQL Server:', err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise,
};
