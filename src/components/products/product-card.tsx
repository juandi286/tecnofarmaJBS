
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Tag, Package, Hash } from 'lucide-react';
import { RestockSuggestion } from './restock-suggestion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isLowStock = product.stock < product.minStock;

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48">
        <Image
          src={product.imageUrl || 'https://placehold.co/300x200.png'}
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          data-ai-hint={product.dataAiHint || 'product image'}
        />
        {isLowStock && (
          <Badge variant="destructive" className="absolute top-2 right-2 flex items-center gap-1 animate-pulse">
            <AlertTriangle className="h-3 w-3" />
            Low Stock
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="font-headline text-lg truncate" title={product.name}>{product.name}</CardTitle>
        <CardDescription className="flex items-center text-xs text-muted-foreground">
          <Tag className="mr-1 h-3 w-3" /> {product.categoryName || 'Uncategorized'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2 text-sm">
        <div className="flex items-center">
          <Package className="mr-2 h-4 w-4 text-primary" />
          Stock: <span className={`font-semibold ml-1 ${isLowStock ? 'text-destructive' : 'text-foreground'}`}>{product.stock}</span>
          <span className="text-xs text-muted-foreground ml-1">(Min: {product.minStock})</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Hash className="mr-2 h-4 w-4" />
          Lot: {product.lotNumber}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <RestockSuggestion product={product} />
      </CardFooter>
    </Card>
  );
}
