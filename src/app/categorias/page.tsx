'use client';
import { useState, useEffect } from 'react';
import { DisenoPrincipal } from '@/components/layout/diseno-principal';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';
import type { Category } from '@/lib/types';
import { ItemListaCategoria } from '@/components/categorias/item-lista-categoria';
import { FormularioAgregarCategoria } from '@/components/categorias/formulario-agregar-categoria';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export default function PaginaCategorias() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchCategories = async () => {
    setIsDataLoading(true);
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudieron cargar las categorías." });
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFormSubmit = async (values: { name: string, description?: string }, existingCategory?: Category) => {
    setIsSubmitting(true);
    const url = existingCategory ? `/api/categories/${existingCategory.id}` : '/api/categories';
    const method = existingCategory ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      await fetchCategories(); // Refetch data to show changes
      
      toast({ 
        title: existingCategory ? "Categoría Actualizada" : "Categoría Añadida", 
        description: `La categoría "${values.name}" se guardó correctamente.` 
      });

      setIsDialogOpen(false);
      setEditingCategory(null);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo guardar la categoría." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    const categoryName = categories.find(c => c.id === categoryId)?.name || 'la categoría';
    try {
      const response = await fetch(`/api/categories/${categoryId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      
      toast({ title: "Categoría Eliminada", description: `Se ha eliminado ${categoryName}.` });
      
      await fetchCategories(); // Refetch
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: `No se pudo eliminar ${categoryName}.` });
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingCategory(null);
    setIsDialogOpen(true);
  };

  return (
    <DisenoPrincipal>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold font-headline">Categorías de Productos</h1>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if(!open) setEditingCategory(null);}}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <PlusCircle className="mr-2 h-5 w-5" /> Añadir Categoría
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-headline">{editingCategory ? 'Editar Categoría' : 'Añadir Nueva Categoría'}</DialogTitle>
                <DialogDescription>
                  {editingCategory ? 'Actualiza los detalles de esta categoría.' : 'Rellena los detalles para la nueva categoría de producto.'}
                </DialogDescription>
              </DialogHeader>
              <FormularioAgregarCategoria 
                onSubmit={handleFormSubmit} 
                existingCategory={editingCategory} 
                isLoading={isSubmitting}
              />
            </DialogContent>
          </Dialog>
        </div>

        {isDataLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : categories.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(category => (
              <ItemListaCategoria
                key={category.id}
                category={category}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <p className="text-center py-10 text-muted-foreground">No se encontraron categorías. Añade una nueva para empezar.</p>
        )}
      </div>
    </DisenoPrincipal>
  );
}
