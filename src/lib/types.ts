export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  cantidadProductos: number;
}

export interface Producto {
  id: string;
  nombre: string;
  descripcion?: string | null;
  categoriaId?: string | null;
  nombreCategoria?: string;
  proveedorId?: string | null;
  numeroLote: string;
  stock: number;
  stockMinimo: number;
  precio?: number | null;
  fechaVencimiento?: string | null; // Formato YYYY-MM-DD
  urlImagen?: string | null;
  ventasDiariasPromedio: number;
  cicloReposicionDias: number;
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

export interface SugerirReposicionOutput {
  cantidadSugerida: number;
  razonamiento: string;
}
