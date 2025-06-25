'use client';
import { useState } from 'react';
import { DisenoPrincipal } from '@/components/layout/diseno-principal';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';
import type { Category } from '@/lib/types';
import { ItemListaCategoria } from '@/components/categorias/item-lista-categoria';
import { FormularioAgregarCategoria } from '@/components/categorias/formulario-agregar-categoria';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { MOCK_CATEGORIES } from '@/lib/constants';

export default function PaginaCategorias() {
  // NOTE: State is now managed locally with mock data
  const [categories, setCategories] = useState<Category[]>([...MOCK_CATEGORIES]);
  const [isDataLoading, setIsDataLoading] = useState(false); // Kept for potential future use
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (values: { name: string, description?: string }, existingCategory?: Category) => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      if (existingCategory) {
        // Update existing category in local state
        setCategories(prev => prev.map(c => 
          c.id === existingCategory.id ? { ...c, ...values } : c
        ));
        toast({ title: "Categoría Actualizada", description: `La categoría "${values.name}" se guardó correctamente.` });
      } else {
        // Add new category to local state
        const newCategory: Category = {
          id: `cat${Date.now()}`,
          name: values.name,
          description: values.description || '',
          productCount: 0,
        };
        setCategories(prev => [newCategory, ...prev]);
        toast({ title: "Categoría Añadida", description: `La categoría "${values.name}" se guardó correctamente.` });
      }
      
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
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // Delete from local state
      setCategories(prev => prev.filter(c => c.id !== categoryId));
      toast({ title: "Categoría Eliminada", description: `Se ha eliminado ${categoryName}.` });
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
