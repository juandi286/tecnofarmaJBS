import { FormularioIngreso } from '@/components/auth/formulario-ingreso';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-primary/10 p-4">
      <FormularioIngreso />
    </div>
  );
}
