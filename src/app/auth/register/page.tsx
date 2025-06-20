import { FormularioRegistro } from '@/components/auth/formulario-registro';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-primary/10 p-4">
      <FormularioRegistro />
    </div>
  );
}
