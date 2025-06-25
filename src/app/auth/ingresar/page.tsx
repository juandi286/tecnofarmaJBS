'use client';
import { useState, useEffect } from 'react';
import { DisenoPrincipal } from '@/components/layout/diseno-principal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Product, Category, Notification } from '@/lib/types';
import { Package, Tags, AlertTriangle, Bell } from 'lucide-react';
import { ItemNotificacionReciente } from '@/components/dashboard/item-notificacion-reciente';
import { TarjetaKpi } from '@/components/dashboard/tarjeta-kpi';
import { Skeleton } from '@/components/ui/skeleton';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_NOTIFICATIONS } from '@/lib/constants';

export default function PaginaPanelControl() {
  // NOTE: Data is now loaded from mock constants, not an API.
  const [products] = useState<Product[]>([...MOCK_PRODUCTS]);
  const [categories] = useState<Category[]>([...MOCK_CATEGORIES]);
  const [notifications] = useState<Notification[]>(
    [...MOCK_NOTIFICATIONS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );
  
  // No loading state needed as data is available immediately
  const isLoading = false;

  const productosBajoStock = products.filter(p => p.stock < p.minStock);
  const notificacionesNoLeidas = notifications.filter(n => !n.read).length;

  return (
    <DisenoPrincipal>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-headline text-foreground">Panel de Control</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            <>
              <Skeleton className="h-36" />
              <Skeleton className="h-36" />
              <Skeleton className="h-36" />
              <Skeleton className="h-36" />
            </>
          ) : (
            <>
              <TarjetaKpi
                title="Productos Totales"
                value={products.length}
                icon={<Package className="h-5 w-5" />}
                description="Número de productos únicos en inventario"
                link="/productos"
                linkLabel="Ver Productos"
              />
              <TarjetaKpi
                title="Categorías de Productos"
                value={categories.length}
                icon={<Tags className="h-5 w-5" />}
                description="Número de categorías de productos definidas"
                link="/categorias"
                linkLabel="Gestionar Categorías"
              />
              <TarjetaKpi
                title="Artículos con Stock Bajo"
                value={productosBajoStock.length}
                icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
                description="Productos que necesitan atención inmediata"
                link="/productos?filter=lowstock"
                linkLabel="Ver Stock Bajo"
              />
              <TarjetaKpi
                title="Notificaciones No Leídas"
                value={notificacionesNoLeidas}
                icon={<Bell className="h-5 w-5" />}
                description="Actualizaciones y alertas importantes del sistema"
                link="/notificaciones"
                linkLabel="Ver Notificaciones"
              />
            </>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Productos Recientes con Stock Bajo</CardTitle>
              <CardDescription>Top 5 de productos por debajo del nivel mínimo de stock.</CardDescription>
            </CardHeader>
            <CardContent>
              {productosBajoStock.slice(0, 5).length > 0 ? (
                <ul className="space-y-2">
                  {productosBajoStock.slice(0, 5).map(product => (
                    <li key={product.id} className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50 transition-colors">
                      <span>{product.name}</span>
                      <span className="text-sm text-destructive font-semibold">Stock: {product.stock} (Min: {product.minStock})</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">Actualmente no hay productos con niveles críticos de stock.</p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Notificaciones Recientes</CardTitle>
              <CardDescription>Últimos mensajes y alertas del sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              {notifications.slice(0, 3).length > 0 ? (
                <ul className="space-y-3">
                  {notifications.slice(0, 3).map(notification => (
                    <ItemNotificacionReciente key={notification.id} notification={notification} />
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No hay notificaciones recientes.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DisenoPrincipal>
  );
}
