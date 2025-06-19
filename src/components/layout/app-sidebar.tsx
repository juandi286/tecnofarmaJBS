
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
  sidebarMenuButtonVariants,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
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
                <Link href={item.href} passHref legacyBehavior>
                  <TooltipTrigger asChild>
                    <a
                      data-sidebar="menu-button"
                      data-active={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                      className={cn(
                        sidebarMenuButtonVariants({
                          variant: "default",
                          size: "default",
                        }),
                        item.disabled && "cursor-not-allowed opacity-50"
                      )}
                      onClick={item.disabled ? (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault() : undefined}
                      aria-disabled={item.disabled}
                      tabIndex={item.disabled ? -1 : undefined}
                      // href is passed by <Link passHref>
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </a>
                  </TooltipTrigger>
                </Link>
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

    