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

const esquemaIngreso = z.object({
  email: z.string().email({ message: 'Dirección de correo electrónico inválida.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Intento de ingreso con:', values);

    if (values.email === 'admin@example.com' && values.password === 'password') {
      toast({
        title: "Ingreso Exitoso",
        description: "¡Bienvenido de nuevo!",
      });
      router.push('/');
    } else {
      toast({
        variant: "destructive",
        title: "Ingreso Fallido",
        description: "Correo electrónico o contraseña inválidos.",
      });
      form.setError("email", { type: "manual", message: " " });
      form.setError("password", { type: "manual", message: "Correo electrónico o contraseña inválidos." });
    }
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
            <Activity className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold font-headline">¡Bienvenido de Nuevo!</CardTitle>
        <CardDescription>Ingresa tus credenciales para acceder a TecnoFarma.</CardDescription>
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
