export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  cantidadProductos: number;
}

export interface Producto {
  id: string;
  nombre: string;
  categoriaId: string;
  nombreCategoria?: string;
  numeroLote: string;
  stock: number;
  stockMinimo: number;
  urlImagen?: string;
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
