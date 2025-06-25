import type { NavItem, Category, Product, Notification } from './types';
import { LayoutDashboard, Tags, PackageSearch, Bell, Settings } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { title: 'Panel de Control', href: '/auth/ingresar', icon: LayoutDashboard },
  { title: 'Categorías', href: '/categorias', icon: Tags },
  { title: 'Productos', href: '/productos', icon: PackageSearch },
  { title: 'Notificaciones', href: '/notificaciones', icon: Bell },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Analgésicos', description: 'Medicamentos para el alivio del dolor', productCount: 15 },
  { id: 'cat2', name: 'Antibióticos', description: 'Medicamentos para tratar infecciones bacterianas', productCount: 22 },
  { id: 'cat3', name: 'Vitaminas', description: 'Suplementos dietéticos', productCount: 30 },
  { id: 'cat4', name: 'Dermatología', description: 'Productos para el cuidado de la piel', productCount: 12 },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod1',
    name: 'Paracetamol 500mg',
    categoryId: 'cat1',
    categoryName: 'Analgésicos',
    lotNumber: 'L23001',
    stock: 50,
    minStock: 20,
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'pastillas medicina',
    averageDailySales: 5,
    reorderCycleDays: 7,
  },
  {
    id: 'prod2',
    name: 'Amoxicilina 250mg',
    categoryId: 'cat2',
    categoryName: 'Antibióticos',
    lotNumber: 'L23002',
    stock: 15,
    minStock: 30,
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'capsulas medicamento',
    averageDailySales: 2,
    reorderCycleDays: 14,
  },
  {
    id: 'prod3',
    name: 'Vitamina C 1000mg',
    categoryId: 'cat3',
    categoryName: 'Vitaminas',
    lotNumber: 'L23003',
    stock: 120,
    minStock: 50,
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'tabletas vitamina',
    averageDailySales: 10,
    reorderCycleDays: 10,
  },
  {
    id: 'prod4',
    name: 'Crema de Hidrocortisona',
    categoryId: 'cat4',
    categoryName: 'Dermatología',
    lotNumber: 'L23004',
    stock: 5,
    minStock: 10,
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'crema piel',
    averageDailySales: 1,
    reorderCycleDays: 30,
  },
  {
    id: 'prod5',
    name: 'Ibuprofeno 200mg',
    categoryId: 'cat1',
    categoryName: 'Analgésicos',
    lotNumber: 'L23005',
    stock: 75,
    minStock: 25,
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'analgesico tabletas',
    averageDailySales: 7,
    reorderCycleDays: 7,
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'notif1', title: 'Actualización del Sistema v1.1', description: 'Una nueva versión de TecnoFarma está disponible con mejoras de rendimiento.', date: '2025-06-19T12:00:00.000Z', read: false },
  { id: 'notif2', title: 'Alerta de Stock Bajo', description: 'Amoxicilina 250mg está por debajo del nivel mínimo de stock.', date: '2025-06-18T10:30:00.000Z', read: false },
  { id: 'notif3', title: 'Categoría "Antisépticos" Añadida', description: 'Se ha añadido exitosamente una nueva categoría de producto.', date: '2025-06-17T08:00:00.000Z', read: true },
];
