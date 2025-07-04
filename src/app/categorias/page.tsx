
'use client';
import { useState, useEffect } from 'react';
import { DisenoPrincipal } from '@/components/layout/diseno-principal';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';
import type { Categoria } from '@/lib/types';
import { ItemListaCategoria } from '@/components/categorias/item-lista-categoria';
import { FormularioAgregarCategoria } from '@/components/categorias/formulario-agregar-categoria';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const API_URL = 'http://localhost:3001/api';

export default function PaginaCategorias() {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Categoria | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchCategories = async () => {
    setIsDataLoading(true);
    try {
      const response = await fetch(`${API_URL}/categorias`);
      if (!response.ok) throw new Error('No se pudieron cargar las categorías.');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast({ variant: "destructive", title: "Error de Carga", description: error instanceof Error ? error.message : "Error desconocido. Asegúrate de que el servidor backend esté corriendo." });
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFormSubmit = async (values: { nombre: string, descripcion?: string }, existingCategory?: Categoria) => {
    setIsSubmitting(true);
    const method = existingCategory ? 'PUT' : 'POST';
    const url = existingCategory ? `${API_URL}/categorias/${existingCategory.id}` : `${API_URL}/categorias`;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error al ${existingCategory ? 'actualizar' : 'crear'} la categoría.`);
      }

      await fetchCategories();
      toast({ title: `Categoría ${existingCategory ? 'Actualizada' : 'Añadida'}`, description: `La categoría "${values.nombre}" se guardó correctamente.` });
      
      setIsDialogOpen(false);
      setEditingCategory(null);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error instanceof Error ? error.message : "No se pudo guardar la categoría." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    const categoryName = categories.find(c => c.id === categoryId)?.nombre || 'la categoría';
    
    try {
      const response = await fetch(`${API_URL}/categorias/${categoryId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`No se pudo eliminar ${categoryName}.`);
      }
      
      await fetchCategories();
      toast({ title: "Categoría Eliminada", description: `Se ha eliminado ${categoryName}.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error instanceof Error ? error.message : `No se pudo eliminar ${categoryName}.` });
    }
  };

  const handleEdit = (category: Categoria) => {
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
