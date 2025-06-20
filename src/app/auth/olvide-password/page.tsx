import { FormularioOlvidePassword } from '@/components/auth/formulario-olvide-password';

export default function PaginaOlvidePassword() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-primary/10 p-4">
      <FormularioOlvidePassword />
    </div>
  );
}
