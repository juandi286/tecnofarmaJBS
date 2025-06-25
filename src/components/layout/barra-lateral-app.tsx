'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';
import type { NavItem } from '@/lib/types';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
  sidebarMenuButtonVariants,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export function BarraLateralApp() {
  const pathname = usePathname();
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);


  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b">
        <Link href="/auth/ingresar" className="flex items-center gap-2 font-semibold font-headline text-lg group-data-[collapsible=icon]:justify-center">
          <Activity className="h-7 w-7 text-primary group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6" />
          <span className="group-data-[collapsible=icon]:hidden">TecnoFarma</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {NAV_ITEMS.map((item: NavItem) => (
            <SidebarMenuItem key={item.title}>
              <Link
                href={item.href}
                data-sidebar="menu-button"
                data-active={pathname === item.href || (item.href !== "/auth/ingresar" && pathname.startsWith(item.href))}
                className={cn(
                  sidebarMenuButtonVariants({
                    variant: "default",
                    size: "default",
                  }),
                  item.disabled && "cursor-not-allowed opacity-50"
                )}
                onClick={item.disabled ? (e: React.MouseEvent) => e.preventDefault() : undefined}
                aria-disabled={item.disabled}
                tabIndex={item.disabled ? -1 : undefined}
              >
                <item.icon className="h-4 w-4" />
                <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t p-2 group-data-[collapsible=icon]:p-0">
         <div className="group-data-[collapsible=icon]:hidden text-xs text-muted-foreground text-center p-2">
            {year && <>© {year} TecnoFarma</>}
         </div>
         <div className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2">
            <SidebarTrigger asChild><Button variant="ghost" size="icon"><Activity className="h-5 w-5"/></Button></SidebarTrigger>
         </div>
      </SidebarFooter>
    </Sidebar>
  );
}
