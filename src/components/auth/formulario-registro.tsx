'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Activity } from 'lucide-react';

const esquemaRegistro = z.object({
  nombreCompleto: z.string().min(2, { message: 'El nombre completo debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Dirección de correo electrónico inválida.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
  confirmarPassword: z.string(),
}).refine(data => data.password === data.confirmarPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmarPassword"],
});

type ValoresFormularioRegistro = z.infer<typeof esquemaRegistro>;

export function FormularioRegistro() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<ValoresFormularioRegistro>({
    resolver: zodResolver(esquemaRegistro),
    defaultValues: {
      nombreCompleto: '',
      email: '',
      password: '',
      confirmarPassword: '',
    },
  });

  async function onSubmit(values: ValoresFormularioRegistro) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Intento de registro con:', values);

    toast({
        title: "Registro Exitoso",
        description: "Tu cuenta ha sido creada. Por favor, inicia sesión.",
    });
    router.push('/auth/ingresar');
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
            <Activity className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold font-headline">Crear Cuenta</CardTitle>
        <CardDescription>Únete a TecnoFarma hoy para gestionar el inventario de tu farmacia.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nombreCompleto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="nombre@ejemplo.com" {...field} />
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="confirmarPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <p className="text-sm text-muted-foreground">
          ¿Ya tienes una cuenta?{' '}
          <Button variant="link" asChild className="p-0 h-auto font-semibold text-primary">
            <Link href="/auth/ingresar">Ingresar</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
