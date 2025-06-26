import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { Category } from '@/lib/types';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    // La consulta SQL para obtener todas las categorías y contar los productos en cada una.
    const [rows]: any[] = await connection.query(`
      SELECT 
        c.id, 
        c.name, 
        c.description, 
        COUNT(p.id) AS productCount
      FROM categories c
      LEFT JOIN products p ON c.id = p.categoryId
      GROUP BY c.id, c.name, c.description
      ORDER BY c.name ASC
    `);
    connection.release();

    // Mapeamos los resultados para asegurarnos que el id es un string
    const categories: Category[] = rows.map((row: any) => ({
      ...row,
      id: row.id.toString(),
    }));

    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al obtener las categorías' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();
    
    // Validación simple
    if (!name) {
      return NextResponse.json({ message: 'El nombre es requerido' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    const [result]: any = await connection.execute(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description || '']
    );
    connection.release();

    const newCategory: Category = {
      id: result.insertId.toString(),
      name,
      description: description || '',
      productCount: 0,
    };

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al crear la categoría' }, { status: 500 });
  }
}
