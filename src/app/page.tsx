'use client';
import { DisenoPrincipal } from '@/components/layout/diseno-principal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_NOTIFICATIONS } from '@/lib/constants';
import { Package, Tags, AlertTriangle, Bell } from 'lucide-react';
import { ItemNotificacionReciente } from '@/components/dashboard/item-notificacion-reciente';
import { TarjetaKpi } from '@/components/dashboard/tarjeta-kpi';

export default function PaginaPanelControl() {
  const productosBajoStock = MOCK_PRODUCTS.filter(p => p.stock < p.minStock).length;
  const notificacionesNoLeidas = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <DisenoPrincipal>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-headline text-foreground">Panel de Control</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <TarjetaKpi
            title="Productos Totales"
            value={MOCK_PRODUCTS.length}
            icon={<Package className="h-5 w-5" />}
            description="Número de productos únicos en inventario"
            link="/productos"
            linkLabel="Ver Productos"
          />
          <TarjetaKpi
            title="Categorías de Productos"
            value={MOCK_CATEGORIES.length}
            icon={<Tags className="h-5 w-5" />}
            description="Número de categorías de productos definidas"
            link="/categorias"
            linkLabel="Gestionar Categorías"
          />
          <TarjetaKpi
            title="Artículos con Stock Bajo"
            value={productosBajoStock}
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
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Productos Recientes con Stock Bajo</CardTitle>
              <CardDescription>Top 5 de productos por debajo del nivel mínimo de stock.</CardDescription>
            </CardHeader>
            <CardContent>
              {MOCK_PRODUCTS.filter(p => p.stock < p.minStock).slice(0,5).length > 0 ? (
                <ul className="space-y-2">
                {MOCK_PRODUCTS.filter(p => p.stock < p.minStock).slice(0,5).map(product => (
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
               {MOCK_NOTIFICATIONS.slice(0,3).length > 0 ? (
                <ul className="space-y-3">
                  {MOCK_NOTIFICATIONS.slice(0,3).map(notification => (
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
