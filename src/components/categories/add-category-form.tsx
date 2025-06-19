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
import type { Category } from '@/lib/types';

const categorySchema = z.object({
  name: z.string().min(2, { message: 'Category name must be at least 2 characters.' }),
  description: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface AddCategoryFormProps {
  onSubmit: (values: CategoryFormValues, existingCategory?: Category) => void;
  existingCategory?: Category | null;
  isLoading?: boolean;
}

export function AddCategoryForm({ onSubmit, existingCategory, isLoading }: AddCategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: existingCategory?.name || '',
      description: existingCategory?.description || '',
    },
  });

  const handleSubmit = (values: CategoryFormValues) => {
    onSubmit(values, existingCategory || undefined);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Analgesics" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Briefly describe the category..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (existingCategory ? 'Updating...' : 'Adding...') : (existingCategory ? 'Update Category' : 'Add Category')}
        </Button>
      </form>
    </Form>
  );
}
