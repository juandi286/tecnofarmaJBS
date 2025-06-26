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
      descripcion: row.descripcion,
      categoriaId: row.categoriaId?.toString(),
      nombreCategoria: row.nombreCategoria,
      proveedorId: row.proveedorId?.toString(),
      numeroLote: row.numeroLote,
      stock: Number(row.stock),
      stockMinimo: Number(row.stockMinimo),
      precio: Number(row.precio),
      fechaVencimiento: row.fechaVencimiento,
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
      // Campos como descripcion, proveedorId, precio, etc., no se piden en el form actual,
      // pero se podrían añadir aquí si se agregan al formulario.
    } = newProductData;

    if (!nombre || !categoriaId || !numeroLote) {
        return NextResponse.json({ message: 'Faltan campos requeridos' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    const [result]: any = await connection.execute(
      'INSERT INTO productos (nombre, categoriaId, numeroLote, stock, stockMinimo, ventasDiariasPromedio, cicloReposicionDias, urlImagen, descripcion, precio, fechaVencimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        nombre, 
        categoriaId, 
        numeroLote, 
        stock, 
        stockMinimo, 
        ventasDiariasPromedio, 
        cicloReposicionDias, 
        'https://placehold.co/300x200.png', // Imagen de placeholder
        '', // Descripcion vacía por defecto
        0, // Precio 0 por defecto
        null // Fecha de vencimiento null por defecto
      ]
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
        id: newProductRows[0].id.toString(),
        nombre: newProductRows[0].nombre,
        descripcion: newProductRows[0].descripcion,
        categoriaId: newProductRows[0].categoriaId?.toString(),
        nombreCategoria: newProductRows[0].nombreCategoria,
        proveedorId: newProductRows[0].proveedorId?.toString(),
        numeroLote: newProductRows[0].numeroLote,
        stock: Number(newProductRows[0].stock),
        stockMinimo: Number(newProductRows[0].stockMinimo),
        precio: Number(newProductRows[0].precio),
        fechaVencimiento: newProductRows[0].fechaVencimiento,
        urlImagen: newProductRows[0].urlImagen,
        ventasDiariasPromedio: Number(newProductRows[0].ventasDiariasPromedio),
        cicloReposicionDias: Number(newProductRows[0].cicloReposicionDias),
    };

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al crear el producto' }, { status: 500 });
  }
}
