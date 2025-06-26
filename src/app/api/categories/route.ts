
import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { Category } from '@/lib/types';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows]: any[] = await connection.query(`
      SELECT 
        c.id, 
        c.name, 
        c.description, 
        (SELECT COUNT(*) FROM products p WHERE p.categoryId = c.id) AS productCount
      FROM categories c
      ORDER BY c.name ASC
    `);
    connection.release();

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
    
    if (!name) {
      return NextResponse.json({ message: 'El nombre es requerido' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    const [result]: any = await connection.execute(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description || '']
    );
    
    const newCategoryId = result.insertId;

    const [newCategoryRows]: any = await connection.query('SELECT *, 0 AS productCount FROM categories WHERE id = ?', [newCategoryId]);
    connection.release();

    const newCategory: Category = {
      ...newCategoryRows[0],
      id: newCategoryRows[0].id.toString(),
    };

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al crear la categoría' }, { status: 500 });
  }
}
