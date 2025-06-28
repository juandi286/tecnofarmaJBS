'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Lightbulb, AlertTriangle } from 'lucide-react';
import type { Producto, SugerirReposicionOutput } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface SugerenciaReposicionProps {
  product: Producto;
}

export function SugerenciaReposicion({ product }: SugerenciaReposicionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SugerirReposicionOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetSuggestion = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    const input = {
      nombreProducto: product.nombre,
      stockActual: product.stock,
      stockMinimo: product.stockMinimo,
      ventasDiariasPromedio: product.ventasDiariasPromedio,
      cicloReposicionDias: product.cicloReposicionDias,
    };

    try {
      const response = await fetch('http://localhost:3001/api/productos/sugerir-reposicion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No se pudo obtener la sugerencia.');
      }

      const result = await response.json();
      setSuggestion(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido.';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Sugerencia Fallida",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button onClick={handleGetSuggestion} disabled={isLoading} variant="outline" size="sm" className="w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Lightbulb className="mr-2 h-4 w-4" />
        )}
        {isLoading ? 'Calculando...' : 'Sugerir Reposición'}
      </Button>

      {error && (
        <Card className="mt-4 border-destructive bg-destructive/10">
          <CardHeader className="flex flex-row items-center gap-2 p-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-sm font-semibold text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 text-sm text-destructive">
            {error}
          </CardContent>
        </Card>
      )}

      {suggestion && (
        <Card className="mt-4 border-primary bg-primary/10">
          <CardHeader className="p-3">
            <CardTitle className="text-base font-semibold text-primary-foreground font-headline">Sugerencia de Reposición</CardTitle>
            <CardDescription className="text-primary-foreground/80">Cálculo para {product.nombre}</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-0 space-y-2">
            <p className="text-lg font-bold text-primary-foreground">
              Pedir: <span className="text-accent">{suggestion.cantidadSugerida} unidades</span>
            </p>
            <div>
              <h4 className="text-sm font-semibold text-primary-foreground/90">Razonamiento:</h4>
              <p className="text-xs text-primary-foreground/80 italic">{suggestion.razonamiento}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
