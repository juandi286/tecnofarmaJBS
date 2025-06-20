"use client";
import Link from 'next/link';
import { Bell, UserCircle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';

export function EncabezadoApp() {
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  const currentPage = NAV_ITEMS.find(item => item.href === pathname);
  const pageTitle = currentPage?.title || "TecnoFarma";


  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
      {isMobile && <SidebarTrigger asChild><Button variant="ghost" size="icon" className="md:hidden"><Menu /></Button></SidebarTrigger>}
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-xl font-headline">{pageTitle}</h1>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/notificaciones" aria-label="Ver notificaciones">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserCircle className="h-6 w-6" />
              <span className="sr-only">Menú de usuario</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Cuenta de Administrador</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuItem>Soporte</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/auth/ingresar">Cerrar Sesión</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
