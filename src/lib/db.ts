
import mysql from 'mysql2/promise';

// --- Línea de Depuración ---
// Esta línea imprimirá el usuario de la base de datos en la terminal cuando el servidor inicie.
// Si ves "DB_USER from env: undefined", significa que tu archivo .env.local no se está cargando.
console.log('DB_USER from env:', process.env.DB_USER);
// --- Fin de la Línea de Depuración ---


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
