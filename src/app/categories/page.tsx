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

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching data
    setCategories(MOCK_CATEGORIES);
  }, []);

  const handleAddCategory = (values: { name: string, description?: string }, existingCategory?: Category) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (existingCategory) {
        // Edit existing category
        setCategories(prev => prev.map(cat => cat.id === existingCategory.id ? { ...cat, ...values } : cat));
        toast({ title: "Category Updated", description: `Category "${values.name}" updated successfully.` });
      } else {
        // Add new category
        const newCategory: Category = {
          id: `cat${Date.now()}`,
          name: values.name,
          description: values.description || '',
          productCount: 0, // New categories start with 0 products
        };
        setCategories(prev => [newCategory, ...prev]);
        toast({ title: "Category Added", description: `Category "${values.name}" added successfully.` });
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
    // Note: Toast is handled in CategoryListItem for this mock
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
          <h1 className="text-3xl font-bold font-headline">Product Categories</h1>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if(!open) setEditingCategory(null);}}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <PlusCircle className="mr-2 h-5 w-5" /> Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-headline">{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                <DialogDescription>
                  {editingCategory ? 'Update the details for this category.' : 'Fill in the details for the new product category.'}
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
          <p className="text-muted-foreground">No categories found. Add a new category to get started.</p>
        )}
      </div>
    </DisenoPrincipal>
  );
}
