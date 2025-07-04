'use client';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import type React from 'react';

interface BarraBusquedaProductoProps {
  onSearchChange: (searchTerm: string) => void;
  placeholder?: string;
}

export function BarraBusquedaProducto({ onSearchChange, placeholder = "Buscar por nombre, categoría o número de lote..." }: BarraBusquedaProductoProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 text-base rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
        onChange={handleInputChange}
        aria-label="Buscar productos"
      />
    </div>
  );
}
