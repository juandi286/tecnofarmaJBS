'use client';
import type { Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Package } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';


interface ItemListaCategoriaProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

export function ItemListaCategoria({ category, onEdit, onDelete }: ItemListaCategoriaProps) {
  const { toast } = useToast();

  const handleDelete = () => {
    onDelete(category.id);
    toast({
      title: "Categoría Eliminada",
      description: `La categoría "${category.name}" ha sido eliminada.`,
    });
  };
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{category.name}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <Package className="mr-2 h-4 w-4" />
          <span>{category.productCount} Productos</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(category)}>
          <Edit className="mr-2 h-4 w-4" /> Editar
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" /> Eliminar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente la
                categoría "{category.name}" y podría afectar a los productos asociados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Continuar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
