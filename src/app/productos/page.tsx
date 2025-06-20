'use client';
import { useState, useMemo } from 'react';
import { DisenoPrincipal } from '@/components/layout/diseno-principal';
import { BarraBusquedaProducto } from '@/components/productos/barra-busqueda-producto';
import { TarjetaProducto } from '@/components/productos/tarjeta-producto';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/constants';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { FormularioAgregarProducto } from '@/components/productos/formulario-agregar-producto';
import { useToast } from '@/hooks/use-toast';

export default function PaginaProductos() {
  const [allProducts, setAllProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (product.categoryName && product.categoryName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            product.lotNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLowStock = filterLowStock ? product.stock < product.minStock : true;
      return matchesSearch && matchesLowStock;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [allProducts, searchTerm, filterLowStock]);

  const handleAddProduct = (values: any) => {
    setIsLoading(true);
    // Simular llamada a la API
    setTimeout(() => {
      const category = MOCK_CATEGORIES.find(cat => cat.id === values.categoryId);
      const newProduct: Product = {
        id: `prod${Date.now()}`,
        imageUrl: 'https://placehold.co/300x200.png',
        dataAiHint: 'medicina producto',
        ...values,
        categoryName: category?.name || 'Sin Categoría',
      };
      setAllProducts(prev => [newProduct, ...prev]);
      setIsLoading(false);
      setIsDialogOpen(false);
      toast({
        title: "Producto Añadido",
        description: `El producto "${values.name}" se ha añadido correctamente.`,
      });
    }, 1000);
  };

  return (
    <DisenoPrincipal>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold font-headline">Productos</h1>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <BarraBusquedaProducto onSearchChange={setSearchTerm} />
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <ListFilter className="h-4 w-4" />
                  <span className="sr-only">Filtro</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filterLowStock}
                  onCheckedChange={setFilterLowStock}
                >
                  Stock Bajo
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-5 w-5" /> Añadir Producto
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="font-headline">Añadir Nuevo Producto</DialogTitle>
                  <DialogDescription>
                    Rellena los detalles para añadir un nuevo producto al inventario.
                  </DialogDescription>
                </DialogHeader>
                <FormularioAgregarProducto
                  onSubmit={handleAddProduct}
                  isLoading={isLoading}
                  categories={MOCK_CATEGORIES}
                />
              </DialogContent>
            </Dialog>

          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <TarjetaProducto key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground font-semibold">No se encontraron productos.</p>
            <p className="text-muted-foreground">Intenta ajustar tus criterios de búsqueda o filtro.</p>
          </div>
        )}
      </div>
    </DisenoPrincipal>
  );
}
