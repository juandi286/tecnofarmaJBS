import { NextResponse } from 'next/server';
import { MOCK_CATEGORIES } from '@/lib/constants';
import type { Category } from '@/lib/types';

// NOTE: In a real app, this would be a database.
// We are mutating the mock data array for simulation purposes.
let categories: Category[] = [...MOCK_CATEGORIES];

export async function GET() {
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const { name, description } = await request.json();
  const newCategory: Category = {
    id: `cat${Date.now()}`,
    name,
    description: description || '',
    productCount: 0,
  };

  categories.unshift(newCategory);

  return NextResponse.json(newCategory, { status: 201 });
}
