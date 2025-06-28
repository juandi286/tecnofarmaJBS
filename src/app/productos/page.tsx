
'use client';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { DisenoPrincipal } from '@/components/layout/diseno-principal';
import { BarraBusquedaProducto } from '@/components/productos/barra-busqueda-producto';
import { TarjetaProducto } from '@/components/productos/tarjeta-producto';
import type { Producto, Categoria } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, ListFilter, Loader2 } from 'lucide-react';
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

const API_URL = 'http://localhost:3001/api';

export default function PaginaProductos() {
  const searchParams = useSearchParams();
  const [allProducts, setAllProducts] = useState<Producto[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLowStock, setFilterLowStock] = useState(searchParams.get('filter') === 'lowstock');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchProductsAndCategories = async () => {
    setIsDataLoading(true);
    try {
      const-
      const productsUrl = `${API_URL}/productos${filterLowStock ? '?filter=lowstock' : ''}`;
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(productsUrl),
        fetch(`${API_URL}/categorias`),
      ]);

      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error('No se pudieron cargar los datos.');
      }
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      setAllProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error de Carga', description: error instanceof Error ? error.message : 'Error desconocido. Asegúrate de que el servidor backend esté corriendo.' });
    } finally {
      setIsDataLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProductsAndCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterLowStock]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      return product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.nombreCategoria && product.nombreCategoria.toLowerCase().includes(searchTerm.toLowerCase())) ||
            product.numeroLote.toLowerCase().includes(searchTerm.toLowerCase());
    }).sort((a, b) => a.nombre.localeCompare(b.nombre));
  }, [allProducts, searchTerm]);

  const handleAddProduct = async (values: any) => {
    setIsSubmitting(true);
    try {
       const response = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Error al añadir el producto.');
      }

      await fetchProductsAndCategories();

      setIsDialogOpen(false);
      toast({
        title: "Producto Añadido",
        description: `El producto "${values.nombre}" se ha añadido correctamente.`,
      });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error instanceof Error ? error.message : "No se pudo añadir el producto." });
    } finally {
      setIsSubmitting(false);
    }
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
                  isLoading={isSubmitting}
                  categories={categories}
                />
              </DialogContent>
            </Dialog>

          </div>
        </div>

        {isDataLoading ? (
           <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredProducts.length > 0 ? (
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
