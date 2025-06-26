
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json({ message: 'El nombre es requerido' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    const [result]: any = await connection.execute(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [name, description || '', id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Categoría no encontrada' }, { status: 404 });
    }
    
    const [updatedRows]: any = await connection.query('SELECT * FROM categories WHERE id = ?', [id]);
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
    
    // Aquí podrías añadir una comprobación para ver si hay productos asociados antes de borrar
    const [result]: any = await connection.execute('DELETE FROM categories WHERE id = ?', [id]);
    connection.release();

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Categoría no encontrada' }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 }); // 204 No Content, éxito sin devolver datos
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al eliminar la categoría' }, { status: 500 });
  }
}
