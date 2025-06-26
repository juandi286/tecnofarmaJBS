import mysql from 'mysql2/promise';

// Configura el pool de conexiones.
// Un pool es más eficiente que abrir y cerrar conexiones para cada consulta.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Exporta el pool para que pueda ser usado en las rutas de la API.
export default pool;
