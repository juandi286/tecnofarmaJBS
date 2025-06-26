'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Categoria } from '@/lib/types';

const esquemaCategoria = z.object({
  nombre: z.string().min(2, { message: 'El nombre de la categoría debe tener al menos 2 caracteres.' }),
  descripcion: z.string().optional(),
});

type ValoresFormularioCategoria = z.infer<typeof esquemaCategoria>;

interface FormularioAgregarCategoriaProps {
  onSubmit: (values: ValoresFormularioCategoria, existingCategory?: Categoria) => void;
  existingCategory?: Categoria | null;
  isLoading?: boolean;
}

export function FormularioAgregarCategoria({ onSubmit, existingCategory, isLoading }: FormularioAgregarCategoriaProps) {
  const form = useForm<ValoresFormularioCategoria>({
    resolver: zodResolver(esquemaCategoria),
    defaultValues: {
      nombre: existingCategory?.nombre || '',
      descripcion: existingCategory?.descripcion || '',
    },
  });

  const handleSubmit = (values: ValoresFormularioCategoria) => {
    onSubmit(values, existingCategory || undefined);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la Categoría</FormLabel>
              <FormControl>
                <Input placeholder="ej., Analgésicos" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción (Opcional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe brevemente la categoría..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (existingCategory ? 'Actualizando...' : 'Añadiendo...') : (existingCategory ? 'Actualizar Categoría' : 'Añadir Categoría')}
        </Button>
      </form>
    </Form>
  );
}
