import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { Product } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');

  try {
    const connection = await pool.getConnection();
    let query = `
      SELECT p.*, c.name as categoryName 
      FROM products p 
      LEFT JOIN categories c ON p.categoryId = c.id
    `;
    
    if (filter === 'lowstock') {
      query += ' WHERE p.stock < p.minStock';
    }
    query += ' ORDER BY p.name ASC';

    const [rows]: any[] = await connection.query(query);
    connection.release();

    // Mapeamos para asegurar que los Ids son strings y los valores numéricos son números
    const products: Product[] = rows.map((row: any) => ({
      id: row.id.toString(),
      name: row.name,
      categoryId: row.categoryId.toString(),
      categoryName: row.categoryName,
      lotNumber: row.lotNumber,
      stock: Number(row.stock),
      minStock: Number(row.minStock),
      imageUrl: row.imageUrl,
      dataAiHint: row.dataAiHint,
      averageDailySales: Number(row.averageDailySales),
      reorderCycleDays: Number(row.reorderCycleDays),
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al obtener los productos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProductData = await request.json();
    const {
      name,
      categoryId,
      lotNumber,
      stock,
      minStock,
      averageDailySales,
      reorderCycleDays
    } = newProductData;

    // Validación simple
    if (!name || !categoryId || !lotNumber) {
        return NextResponse.json({ message: 'Faltan campos requeridos' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    const [result]: any = await connection.execute(
      'INSERT INTO products (name, categoryId, lotNumber, stock, minStock, averageDailySales, reorderCycleDays, imageUrl, dataAiHint) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, categoryId, lotNumber, stock, minStock, averageDailySales, reorderCycleDays, 'https://placehold.co/300x200.png', 'medicina producto']
    );
    connection.release();

    const newProduct = {
        id: result.insertId.toString(),
        imageUrl: 'https://placehold.co/300x200.png',
        dataAiHint: 'medicina producto',
        ...newProductData,
    };

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al crear el producto' }, { status: 500 });
  }
}
