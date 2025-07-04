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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Categoria } from '@/lib/types';

const esquemaProducto = z.object({
  nombre: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres.' }),
  categoriaId: z.string({ required_error: 'Por favor selecciona una categoría.' }),
  numeroLote: z.string().min(1, { message: 'El número de lote es requerido.' }),
  stock: z.coerce.number().min(0, { message: 'El stock no puede ser negativo.' }),
  stockMinimo: z.coerce.number().min(0, { message: 'El stock mínimo no puede ser negativo.' }),
  ventasDiariasPromedio: z.coerce.number().min(0, { message: 'Las ventas promedio no pueden ser negativas.' }),
  cicloReposicionDias: z.coerce.number().min(1, { message: 'El ciclo debe ser de al menos 1 día.' }),
});

type ValoresFormularioProducto = z.infer<typeof esquemaProducto>;

interface FormularioAgregarProductoProps {
  onSubmit: (values: ValoresFormularioProducto) => void;
  isLoading?: boolean;
  categories: Categoria[];
}

export function FormularioAgregarProducto({ onSubmit, isLoading, categories }: FormularioAgregarProductoProps) {
  const form = useForm<ValoresFormularioProducto>({
    resolver: zodResolver(esquemaProducto),
    defaultValues: {
      nombre: '',
      numeroLote: '',
      stock: 0,
      stockMinimo: 10,
      ventasDiariasPromedio: 1,
      cicloReposicionDias: 7,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Producto</FormLabel>
              <FormControl>
                <Input placeholder="ej., Paracetamol 500mg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoriaId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="numeroLote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Lote</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Actual</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="stockMinimo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Mínimo</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="ventasDiariasPromedio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ventas Diarias</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="cicloReposicionDias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciclo Repos.</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Añadiendo...' : 'Añadir Producto'}
        </Button>
      </form>
    </Form>
  );
}
