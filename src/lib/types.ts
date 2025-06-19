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
