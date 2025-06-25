import { NextResponse } from 'next/server';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/constants';
import type { Product } from '@/lib/types';

// NOTE: In a real app, this would be a database.
// We are mutating the mock data array for simulation purposes.
let products: Product[] = [...MOCK_PRODUCTS];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');

  if (filter === 'lowstock') {
    const lowStockProducts = products.filter(p => p.stock < p.minStock);
    return NextResponse.json(lowStockProducts);
  }

  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const newProductData = await request.json();
  
  const category = MOCK_CATEGORIES.find(cat => cat.id === newProductData.categoryId);
  
  const newProduct: Product = {
    id: `prod${Date.now()}`,
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'medicina producto',
    ...newProductData,
    categoryName: category?.name || 'Sin Categoría',
  };

  products.unshift(newProduct); // Add to the beginning of the array

  return NextResponse.json(newProduct, { status: 201 });
}
