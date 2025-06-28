
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// OBTENER TODOS LOS PRODUCTOS (CON FILTRO OPCIONAL)
router.get('/', async (req, res, next) => {
  const { filter } = req.query;

  try {
    const connection = await pool.getConnection();
    let query = `
      SELECT p.*, c.nombre as nombreCategoria 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoriaId = c.id
    `;
    
    if (filter === 'lowstock') {
      query += ' WHERE p.stock < p.stockMinimo';
    }
    query += ' ORDER BY p.nombre ASC';

    const [rows] = await connection.query(query);
    connection.release();

    res.json(rows);
  } catch (error) {
    next(error);
  }
});

// CREAR UN NUEVO PRODUCTO
router.post('/', async (req, res, next) => {
  try {
    const {
      nombre,
      categoriaId,
      numeroLote,
      stock,
      stockMinimo,
      ventasDiariasPromedio,
      cicloReposicionDias
    } = req.body;

    if (!nombre || !categoriaId || !numeroLote) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO productos (nombre, categoriaId, numeroLote, stock, stockMinimo, ventasDiariasPromedio, cicloReposicionDias, urlImagen, descripcion, precio, fechaVencimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        nombre, 
        categoriaId, 
        numeroLote, 
        stock, 
        stockMinimo, 
        ventasDiariasPromedio, 
        cicloReposicionDias, 
        'https://placehold.co/300x200.png',
        '', 
        0,
        null
      ]
    );
    
    const newProductId = result.insertId;
    const [newProductRows] = await connection.query(`
        SELECT p.*, c.nombre as nombreCategoria 
        FROM productos p 
        LEFT JOIN categorias c ON p.categoriaId = c.id 
        WHERE p.id = ?`, 
        [newProductId]
    );
    connection.release();
    
    res.status(201).json(newProductRows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
