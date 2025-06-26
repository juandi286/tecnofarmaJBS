import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { Producto } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');

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

    const [rows]: any[] = await connection.query(query);
    connection.release();

    const products: Producto[] = rows.map((row: any) => ({
      id: row.id.toString(),
      nombre: row.nombre,
      categoriaId: row.categoriaId?.toString(),
      nombreCategoria: row.nombreCategoria,
      numeroLote: row.numeroLote,
      stock: Number(row.stock),
      stockMinimo: Number(row.stockMinimo),
      urlImagen: row.urlImagen,
      ventasDiariasPromedio: Number(row.ventasDiariasPromedio),
      cicloReposicionDias: Number(row.cicloReposicionDias),
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
      nombre,
      categoriaId,
      numeroLote,
      stock,
      stockMinimo,
      ventasDiariasPromedio,
      cicloReposicionDias
    } = newProductData;

    if (!nombre || !categoriaId || !numeroLote) {
        return NextResponse.json({ message: 'Faltan campos requeridos' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    const [result]: any = await connection.execute(
      'INSERT INTO productos (nombre, categoriaId, numeroLote, stock, stockMinimo, ventasDiariasPromedio, cicloReposicionDias, urlImagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, categoriaId, numeroLote, stock, stockMinimo, ventasDiariasPromedio, cicloReposicionDias, 'https://placehold.co/300x200.png']
    );
    
    const newProductId = result.insertId;
    const [newProductRows]: any = await connection.query(`
        SELECT p.*, c.nombre as nombreCategoria 
        FROM productos p 
        LEFT JOIN categorias c ON p.categoriaId = c.id 
        WHERE p.id = ?`, 
        [newProductId]
    );
    connection.release();
    
    const newProduct: Producto = {
        ...newProductRows[0],
        id: newProductRows[0].id.toString(),
        categoriaId: newProductRows[0].categoriaId.toString(),
    };


    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al crear el producto' }, { status: 500 });
  }
}
