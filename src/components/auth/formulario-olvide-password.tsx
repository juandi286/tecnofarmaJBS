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

const esquemaOlvidePassword = z.object({
  email: z.string().email({ message: 'Por favor, introduce una dirección de correo electrónico válida.' }),
});

type ValoresFormularioOlvidePassword = z.infer<typeof esquemaOlvidePassword>;

export function FormularioOlvidePassword() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<ValoresFormularioOlvidePassword>({
    resolver: zodResolver(esquemaOlvidePassword),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: ValoresFormularioOlvidePassword) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Solicitud de restablecimiento para:', values.email);

    toast({
      title: "Solicitud Recibida",
      description: "Si una cuenta con ese correo electrónico existe, se ha enviado un enlace para restablecer la contraseña.",
    });
    router.push('/auth/ingresar');
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
            <Activity className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold font-headline">¿Olvidaste tu Contraseña?</CardTitle>
        <CardDescription>No te preocupes. Introduce tu correo electrónico y te enviaremos un enlace para restablecerla.</CardDescription>
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
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Enviando...' : 'Enviar Enlace de Restablecimiento'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/auth/ingresar" className={cn(buttonVariants({ variant: "link" }), "text-sm")}>
            Volver a iniciar sesión
        </Link>
      </CardFooter>
    </Card>
  );
}
