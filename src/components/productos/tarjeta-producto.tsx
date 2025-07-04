'use client';
import Image from 'next/image';
import type { Producto } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Tag, Package, Hash } from 'lucide-react';
import { SugerenciaReposicion } from './sugerencia-reposicion';

interface TarjetaProductoProps {
  product: Producto;
}

export function TarjetaProducto({ product }: TarjetaProductoProps) {
  const isLowStock = product.stock < product.stockMinimo;

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48">
        <Image
          src={product.urlImagen || 'https://placehold.co/300x200.png'}
          alt={product.nombre}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {isLowStock && (
          <Badge variant="destructive" className="absolute top-2 right-2 flex items-center gap-1 animate-pulse">
            <AlertTriangle className="h-3 w-3" />
            Stock Bajo
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="font-headline text-lg truncate" title={product.nombre}>{product.nombre}</CardTitle>
        <CardDescription className="flex items-center text-xs text-muted-foreground">
          <Tag className="mr-1 h-3 w-3" /> {product.nombreCategoria || 'Sin Categoría'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2 text-sm">
        <div className="flex items-center">
          <Package className="mr-2 h-4 w-4 text-primary" />
          Stock: <span className={`font-semibold ml-1 ${isLowStock ? 'text-destructive' : 'text-foreground'}`}>{product.stock}</span>
          <span className="text-xs text-muted-foreground ml-1">(Min: {product.stockMinimo})</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Hash className="mr-2 h-4 w-4" />
          Lote: {product.numeroLote}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <SugerenciaReposicion product={product} />
      </CardFooter>
    </Card>
  );
}
