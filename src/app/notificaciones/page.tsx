'use client';
import { useState, useEffect } from 'react';
import { DisenoPrincipal } from '@/components/layout/diseno-principal';
import { ItemNotificacion } from '@/components/notificaciones/item-notificacion';
import type { Notification } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { CheckCheck, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PaginaNotificaciones() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/notifications');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setNotifications(data.sort((a: Notification, b: Notification) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudieron cargar las notificaciones.' });
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, [toast]);

  const handleMarkAsRead = (notificationId: string) => {
    // This action only affects local state. A real implementation would call an API.
    setNotifications(prev =>
      prev.map(n => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    // This action only affects local state. A real implementation would call an API.
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

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : notifications.length > 0 ? (
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
