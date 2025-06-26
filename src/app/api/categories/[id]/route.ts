
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { nombre, descripcion } = await request.json();

    if (!nombre) {
      return NextResponse.json({ message: 'El nombre es requerido' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    const [result]: any = await connection.execute(
      'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?',
      [nombre, descripcion || '', id]
    );
    
    if (result.affectedRows === 0) {
      connection.release();
      return NextResponse.json({ message: 'Categoría no encontrada' }, { status: 404 });
    }
    
    const [updatedRows]: any = await connection.query('SELECT *, (SELECT COUNT(*) FROM productos p WHERE p.categoriaId = categorias.id) AS cantidadProductos FROM categorias WHERE id = ?', [id]);
    connection.release();


    return NextResponse.json(updatedRows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al actualizar la categoría' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const connection = await pool.getConnection();
    
    const [result]: any = await connection.execute('DELETE FROM categorias WHERE id = ?', [id]);
    connection.release();

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Categoría no encontrada' }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al eliminar la categoría' }, { status: 500 });
  }
}
