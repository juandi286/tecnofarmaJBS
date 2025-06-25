export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  categoryName?: string; // Optional, can be joined
  lotNumber: string;
  stock: number;
  minStock: number;
  imageUrl?: string;
  dataAiHint?: string;
  averageDailySales: number;
  reorderCycleDays: number;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  read: boolean;
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
}

// Tipos para la sugerencia de reposición que antes estaban en el flujo de IA
export interface SugerirReposicionInput {
  nombreProducto: string;
  stockActual: number;
  stockMinimo: number;
  ventasDiariasPromedio: number;
  cicloReposicionDias: number;
}

export interface SugerirReposicionOutput {
  cantidadSugerida: number;
  razonamiento: string;
}
