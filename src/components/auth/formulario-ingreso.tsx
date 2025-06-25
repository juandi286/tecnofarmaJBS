'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

// El esquema se simplifica para no requerir validación estricta, facilitando el acceso.
const esquemaIngreso = z.object({
  email: z.string(),
  password: z.string(),
});

type ValoresFormularioIngreso = z.infer<typeof esquemaIngreso>;

export function FormularioIngreso() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<ValoresFormularioIngreso>({
    resolver: zodResolver(esquemaIngreso),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: ValoresFormularioIngreso) {
    // Simulación de ingreso directo para el prototipo de frontend.
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: "Ingreso Exitoso",
      description: "Accediendo al panel...",
    });
    router.push('/auth/ingresar'); // Redirige al dashboard que ahora está en esta ruta
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
            <Activity className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold font-headline">¡Bienvenido a TecnoFarma!</CardTitle>
        <CardDescription>Presiona "Ingresar" para acceder al prototipo. No se requiere autenticación.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Ingresa cualquier dato..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Ingresa cualquier dato..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        <Link href="/auth/olvide-password" className={cn(buttonVariants({ variant: "link" }), "text-sm")}>
            ¿Olvidaste tu contraseña?
        </Link>
        <p className="text-sm text-muted-foreground">
          ¿No tienes una cuenta?{' '}
          <Link href="/auth/registro" className={cn(buttonVariants({ variant: "link" }), "p-0 h-auto font-semibold text-primary")}>
            Regístrate
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
