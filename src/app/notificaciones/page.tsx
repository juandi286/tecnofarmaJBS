'use client';
import { useState } from 'react';
import { DisenoPrincipal } from '@/components/layout/diseno-principal';
import { ItemNotificacion } from '@/components/notificaciones/item-notificacion';
import { MOCK_NOTIFICATIONS } from '@/lib/constants';
import type { Notification } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { CheckCheck } from 'lucide-react';

export default function PaginaNotificaciones() {
  const [notifications, setNotifications] = useState<Notification[]>(() =>
    MOCK_NOTIFICATIONS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DisenoPrincipal>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold font-headline">Notificaciones</h1>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <CheckCheck className="mr-2 h-4 w-4" /> Marcar todas como leídas ({unreadCount})
            </Button>
          )}
        </div>

        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map(notification => (
              <ItemNotificacion
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground font-semibold">No hay notificaciones aún.</p>
            <p className="text-muted-foreground">Las actualizaciones y alertas del sistema aparecerán aquí.</p>
          </div>
        )}
      </div>
    </DisenoPrincipal>
  );
}
