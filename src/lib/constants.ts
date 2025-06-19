import type { NavItem, Category, Product, Notification } from './types';
import { LayoutDashboard, Tags, PackageSearch, Bell, Settings } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'Categories', href: '/categories', icon: Tags },
  { title: 'Products', href: '/products', icon: PackageSearch },
  { title: 'Notifications', href: '/notifications', icon: Bell },
  // { title: 'Settings', href: '/settings', icon: Settings, disabled: true },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Analgesics', description: 'Medications for pain relief', productCount: 15 },
  { id: 'cat2', name: 'Antibiotics', description: 'Medications to treat bacterial infections', productCount: 22 },
  { id: 'cat3', name: 'Vitamins', description: 'Dietary supplements', productCount: 30 },
  { id: 'cat4', name: 'Dermatology', description: 'Skincare products', productCount: 12 },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod1',
    name: 'Paracetamol 500mg',
    categoryId: 'cat1',
    categoryName: 'Analgesics',
    lotNumber: 'L23001',
    stock: 50,
    minStock: 20,
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'pills medicine',
    averageDailySales: 5,
    reorderCycleDays: 7,
  },
  {
    id: 'prod2',
    name: 'Amoxicillin 250mg',
    categoryId: 'cat2',
    categoryName: 'Antibiotics',
    lotNumber: 'L23002',
    stock: 15,
    minStock: 30,
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'capsules medication',
    averageDailySales: 2,
    reorderCycleDays: 14,
  },
  {
    id: 'prod3',
    name: 'Vitamin C 1000mg',
    categoryId: 'cat3',
    categoryName: 'Vitamins',
    lotNumber: 'L23003',
    stock: 120,
    minStock: 50,
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'vitamin tablets',
    averageDailySales: 10,
    reorderCycleDays: 10,
  },
  {
    id: 'prod4',
    name: 'Hydrocortisone Cream',
    categoryId: 'cat4',
    categoryName: 'Dermatology',
    lotNumber: 'L23004',
    stock: 5,
    minStock: 10,
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'skin cream',
    averageDailySales: 1,
    reorderCycleDays: 30,
  },
  {
    id: 'prod5',
    name: 'Ibuprofen 200mg',
    categoryId: 'cat1',
    categoryName: 'Analgesics',
    lotNumber: 'L23005',
    stock: 75,
    minStock: 25,
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'painkiller tablets',
    averageDailySales: 7,
    reorderCycleDays: 7,
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'notif1', title: 'System Update v1.1', description: 'A new version of TecnoFarma is available with performance improvements.', date: new Date(Date.now() - 86400000).toISOString(), read: false },
  { id: 'notif2', title: 'Low Stock Alert', description: 'Amoxicillin 250mg is below minimum stock level.', date: new Date(Date.now() - 172800000).toISOString(), read: false },
  { id: 'notif3', title: 'Category "Antiseptics" Added', description: 'A new product category has been successfully added.', date: new Date(Date.now() - 259200000).toISOString(), read: true },
];
