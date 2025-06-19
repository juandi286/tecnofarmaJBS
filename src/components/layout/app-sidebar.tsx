
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
  useSidebar,
  sidebarMenuButtonVariants, // Import the variants
} from '@/components/ui/sidebar';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function AppSidebar() {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b">
        <Link href="/" className="flex items-center gap-2 font-semibold font-headline text-lg group-data-[collapsible=icon]:justify-center">
          <Activity className="h-7 w-7 text-primary group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6" />
          <span className="group-data-[collapsible=icon]:hidden">TecnoFarma</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {NAV_ITEMS.map((item: NavItem) => (
            <SidebarMenuItem key={item.title}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    onClick={item.disabled ? (e: React.MouseEvent) => e.preventDefault() : undefined}
                    aria-disabled={item.disabled}
                    tabIndex={item.disabled ? -1 : undefined}
                    data-sidebar="menu-button" // Replicate attributes
                    data-active={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                    className={cn(
                      sidebarMenuButtonVariants({
                        variant: "default",
                        size: "default",
                        // isActive prop is not part of variants, handled by data-active CSS selector
                      }),
                      item.disabled && "cursor-not-allowed opacity-50"
                      // Active state styling is handled by data-[active=true] in sidebar.tsx CSS for menu-button
                    )}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent 
                  side="right" 
                  align="center" 
                  hidden={state !== "collapsed" || isMobile}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t p-2 group-data-[collapsible=icon]:p-0">
         <div className="group-data-[collapsible=icon]:hidden text-xs text-muted-foreground text-center p-2">
            © {new Date().getFullYear()} TecnoFarma
         </div>
         <div className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2">
            <SidebarTrigger asChild><Button variant="ghost" size="icon"><Activity className="h-5 w-5"/></Button></SidebarTrigger>
         </div>
      </SidebarFooter>
    </Sidebar>
  );
}

