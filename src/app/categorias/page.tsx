'use client';
import { useState, useEffect } from 'react';
import { DisenoPrincipal } from '@/components/layout/diseno-principal';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { MOCK_CATEGORIES } from '@/lib/constants';
import type { Category } from '@/lib/types';
import { ItemListaCategoria } from '@/components/categorias/item-lista-categoria';
import { FormularioAgregarCategoria } from '@/components/categorias/formulario-agregar-categoria';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export default function PaginaCategorias() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setCategories(MOCK_CATEGORIES);
  }, []);

  const handleAddCategory = (values: { name: string, description?: string }, existingCategory?: Category) => {
    setIsLoading(true);
    setTimeout(() => {
      if (existingCategory) {
        setCategories(prev => prev.map(cat => cat.id === existingCategory.id ? { ...cat, ...values } : cat));
        toast({ title: "Categoría Actualizada", description: `La categoría "${values.name}" se actualizó correctamente.` });
      } else {
        const newCategory: Category = {
          id: `cat${Date.now()}`,
          name: values.name,
          description: values.description || '',
          productCount: 0,
        };
        setCategories(prev => [newCategory, ...prev]);
        toast({ title: "Categoría Añadida", description: `La categoría "${values.name}" se añadió correctamente.` });
      }
      setIsDialogOpen(false);
      setEditingCategory(null);
      setIsLoading(false);
    }, 1000);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleDelete = (categoryId: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
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
                onSubmit={handleAddCategory} 
                existingCategory={editingCategory} 
                isLoading={isLoading}
              />
            </DialogContent>
          </Dialog>
        </div>

        {categories.length > 0 ? (
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
          <p className="text-muted-foreground">No se encontraron categorías. Añade una nueva para empezar.</p>
        )}
      </div>
    </DisenoPrincipal>
  );
}
