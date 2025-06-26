
import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { Categoria } from '@/lib/types';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows]: any[] = await connection.query(`
      SELECT 
        c.id, 
        c.nombre, 
        c.descripcion, 
        (SELECT COUNT(*) FROM productos p WHERE p.categoriaId = c.id) AS cantidadProductos
      FROM categorias c
      ORDER BY c.nombre ASC
    `);
    connection.release();

    const categorias: Categoria[] = rows.map((row: any) => ({
      ...row,
      id: row.id.toString(),
    }));

    return NextResponse.json(categorias);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al obtener las categorías' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { nombre, descripcion } = await request.json();
    
    if (!nombre) {
      return NextResponse.json({ message: 'El nombre es requerido' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    const [result]: any = await connection.execute(
      'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion || '']
    );
    
    const newCategoryId = result.insertId;

    const [newCategoryRows]: any = await connection.query('SELECT *, 0 AS cantidadProductos FROM categorias WHERE id = ?', [newCategoryId]);
    connection.release();

    const newCategory: Categoria = {
      ...newCategoryRows[0],
      id: newCategoryRows[0].id.toString(),
    };

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al crear la categoría' }, { status: 500 });
  }
}
