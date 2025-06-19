'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Lightbulb, AlertTriangle } from 'lucide-react';
import { getRestockSuggestion } from '@/lib/actions';
import type { Product } from '@/lib/types';
import type { SuggestRestockInput, SuggestRestockOutput } from '@/ai/flows/suggest-restock';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface RestockSuggestionProps {
  product: Product;
}

export function RestockSuggestion({ product }: RestockSuggestionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestRestockOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetSuggestion = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    const input: SuggestRestockInput = {
      productName: product.name,
      currentStock: product.stock,
      minimumStock: product.minStock,
      averageDailySales: product.averageDailySales,
      reorderCycleDays: product.reorderCycleDays,
    };

    try {
      const result = await getRestockSuggestion(input);
      setSuggestion(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Suggestion Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <Button onClick={handleGetSuggestion} disabled={isLoading} variant="outline" size="sm" className="w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Lightbulb className="mr-2 h-4 w-4" />
        )}
        {isLoading ? 'Getting Suggestion...' : 'Suggest Restock'}
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
            <CardTitle className="text-base font-semibold text-primary-foreground font-headline">Restock Suggestion</CardTitle>
            <CardDescription className="text-primary-foreground/80">AI Recommended Quantity for {product.name}</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-0 space-y-2">
            <p className="text-lg font-bold text-primary-foreground">
              Reorder: <span className="text-accent">{suggestion.reorderQuantity} units</span>
            </p>
            <div>
              <h4 className="text-sm font-semibold text-primary-foreground/90">Reasoning:</h4>
              <p className="text-xs text-primary-foreground/80 italic">{suggestion.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
