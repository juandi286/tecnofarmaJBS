
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// OBTENER TODAS LAS CATEGORÍAS
router.get('/', async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT 
        c.id, 
        c.nombre, 
        c.descripcion, 
        (SELECT COUNT(*) FROM productos p WHERE p.categoriaId = c.id) AS cantidadProductos
      FROM categorias c
      ORDER BY c.nombre ASC
    `);
    connection.release();
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

// CREAR UNA NUEVA CATEGORÍA
router.post('/', async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es requerido' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion || '']
    );
    const newCategoryId = result.insertId;
    const [newCategoryRows] = await connection.query('SELECT *, 0 AS cantidadProductos FROM categorias WHERE id = ?', [newCategoryId]);
    connection.release();
    
    res.status(201).json(newCategoryRows[0]);
  } catch (error) {
    next(error);
  }
});

// ACTUALIZAR UNA CATEGORÍA
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es requerido' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?',
      [nombre, descripcion || '', id]
    );
    
    if (result.affectedRows === 0) {
      connection.release();
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    
    const [updatedRows] = await connection.query('SELECT *, (SELECT COUNT(*) FROM productos p WHERE p.categoriaId = categorias.id) AS cantidadProductos FROM categorias WHERE id = ?', [id]);
    connection.release();

    res.json(updatedRows[0]);
  } catch (error) {
    next(error);
  }
});

// ELIMINAR UNA CATEGORÍA
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute('DELETE FROM categorias WHERE id = ?', [id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
