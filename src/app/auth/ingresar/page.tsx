import { FormularioIngreso } from '@/components/auth/formulario-ingreso';

export default function PaginaIngreso() {
  return (
    <div className="flex flex-1 min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-primary/10 p-4">
      <FormularioIngreso />
    </div>
  );
}
