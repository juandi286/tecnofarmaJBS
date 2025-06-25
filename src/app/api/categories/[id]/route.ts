import { NextResponse } from 'next/server';
import { MOCK_CATEGORIES } from '@/lib/constants';
import type { Category } from '@/lib/types';

// NOTE: In a real app, this would be a database.
// We are mutating the mock data array for simulation purposes.
let categories: Category[] = [...MOCK_CATEGORIES];

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, description } = await request.json();
  
  const categoryIndex = categories.findIndex(cat => cat.id === id);

  if (categoryIndex === -1) {
    return NextResponse.json({ message: 'Category not found' }, { status: 404 });
  }

  const updatedCategory = { ...categories[categoryIndex], name, description };
  categories[categoryIndex] = updatedCategory;

  return NextResponse.json(updatedCategory);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  
  const initialLength = categories.length;
  categories = categories.filter(cat => cat.id !== id);

  if (categories.length === initialLength) {
    return NextResponse.json({ message: 'Category not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
}
