import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_NOTIFICATIONS } from '@/lib/constants';
import { Package, Tags, AlertTriangle, Bell } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  link?: string;
  linkLabel?: string;
}

function KpiCard({ title, value, icon, description, link, linkLabel }: KpiCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium font-body">{title}</CardTitle>
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-headline">{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
        {link && linkLabel && (
          <Link href={link} className={cn(buttonVariants({ variant: "link", className: "p-0 h-auto mt-2 text-primary" }))}>
            {linkLabel}
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const lowStockProducts = MOCK_PRODUCTS.filter(p => p.stock < p.minStock).length;
  const unreadNotifications = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-headline text-foreground">Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Total Products"
            value={MOCK_PRODUCTS.length}
            icon={<Package className="h-5 w-5" />}
            description="Number of unique products in inventory"
            link="/products"
            linkLabel="View Products"
          />
          <KpiCard
            title="Product Categories"
            value={MOCK_CATEGORIES.length}
            icon={<Tags className="h-5 w-5" />}
            description="Number of defined product categories"
            link="/categories"
            linkLabel="Manage Categories"
          />
          <KpiCard
            title="Low Stock Items"
            value={lowStockProducts}
            icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
            description="Products needing immediate attention"
            link="/products?filter=lowstock"
            linkLabel="View Low Stock"
          />
          <KpiCard
            title="Unread Notifications"
            value={unreadNotifications}
            icon={<Bell className="h-5 w-5" />}
            description="Important system updates and alerts"
            link="/notifications"
            linkLabel="Check Notifications"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Recent Low Stock Products</CardTitle>
              <CardDescription>Top 5 products currently below minimum stock levels.</CardDescription>
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
                <p className="text-muted-foreground">No products are currently critically low on stock.</p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Recent Notifications</CardTitle>
              <CardDescription>Latest system messages and alerts.</CardDescription>
            </CardHeader>
            <CardContent>
               {MOCK_NOTIFICATIONS.slice(0,3).length > 0 ? (
                <ul className="space-y-3">
                  {MOCK_NOTIFICATIONS.slice(0,3).map(notification => (
                    <li key={notification.id} className="p-2 rounded-md hover:bg-muted/50 transition-colors border-l-4 border-primary">
                      <h4 className="font-semibold">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(notification.date).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No recent notifications.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
