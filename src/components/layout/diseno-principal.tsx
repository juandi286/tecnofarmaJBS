import type { ReactNode } from 'react';
import { BarraLateralApp } from './barra-lateral-app';
import { EncabezadoApp } from './encabezado-app';
import { SidebarInset } from '@/components/ui/sidebar';

interface DisenoPrincipalProps {
  children: ReactNode;
}

export function DisenoPrincipal({ children }: DisenoPrincipalProps) {
  return (
    <div className="flex min-h-screen w-full">
      <BarraLateralApp />
      <SidebarInset className="flex flex-col">
        <EncabezadoApp />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background">
          {children}
        </main>
      </SidebarInset>
    </div>
  );
}
