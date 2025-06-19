'use client';
import { useState, useEffect, useMemo } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ProductSearchBar } from '@/components/products/product-search-bar';
import { ProductCard } from '@/components/products/product-card';
import { MOCK_PRODUCTS } from '@/lib/constants';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, ListFilter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLowStock, setFilterLowStock] = useState(false);

  useEffect(() => {
    // Simulate fetching data
    const productsWithCategoryNames = MOCK_PRODUCTS.map(p => ({
      ...p,
      // In a real app, categoryName would be joined or fetched separately
      categoryName: MOCK_PRODUCTS.find(mockP => mockP.id === p.id)?.categoryName || "Unknown Category"
    }));
    setAllProducts(productsWithCategoryNames);
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (product.categoryName && product.categoryName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            product.lotNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLowStock = filterLowStock ? product.stock < product.minStock : true;
      return matchesSearch && matchesLowStock;
    });
  }, [allProducts, searchTerm, filterLowStock]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold font-headline">Products</h1>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <ProductSearchBar onSearchChange={setSearchTerm} />
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <ListFilter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filterLowStock}
                  onCheckedChange={setFilterLowStock}
                >
                  Low Stock
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button disabled> {/* Placeholder for Add Product */}
              <PlusCircle className="mr-2 h-5 w-5" /> Add Product
            </Button>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground font-semibold">No products found.</p>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
