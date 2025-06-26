import type { NavItem, Notification } from './types';
import { LayoutDashboard, Tags, PackageSearch, Bell, Settings } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { title: 'Panel de Control', href: '/auth/ingresar', icon: LayoutDashboard },
  { title: 'Categorías', href: '/categorias', icon: Tags },
  { title: 'Productos', href: '/productos', icon: PackageSearch },
  { title: 'Notificaciones', href: '/notificaciones', icon: Bell },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'notif1', title: 'Actualización del Sistema v1.1', description: 'Una nueva versión de TecnoFarma está disponible con mejoras de rendimiento.', date: '2025-06-19T12:00:00.000Z', read: false },
  { id: 'notif2', title: 'Alerta de Stock Bajo', description: 'Amoxicilina 250mg está por debajo del nivel mínimo de stock.', date: '2025-06-18T10:30:00.000Z', read: false },
  { id: 'notif3', title: 'Categoría "Antisépticos" Añadida', description: 'Se ha añadido exitosamente una nueva categoría de producto.', date: '2025-06-17T08:00:00.000Z', read: true },
];
