import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface TarjetaKpiProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  link?: string;
  linkLabel?: string;
}

export function TarjetaKpi({ title, value, icon, description, link, linkLabel }: TarjetaKpiProps) {
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
