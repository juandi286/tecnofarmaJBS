'use client';
import type { Notification } from '@/lib/types';
import { useState, useEffect } from 'react';

export function ItemNotificacionReciente({ notification }: { notification: Notification }) {
  const [date, setDate] = useState('');

  useEffect(() => {
    // Format the date only on the client-side to prevent hydration mismatch.
    setDate(new Date(notification.date).toLocaleDateString());
  }, [notification.date]);

  return (
    <li className="p-2 rounded-md hover:bg-muted/50 transition-colors border-l-4 border-primary">
      <h4 className="font-semibold">{notification.title}</h4>
      <p className="text-sm text-muted-foreground">{notification.description}</p>
      {date && <p className="text-xs text-muted-foreground mt-1">{date}</p>}
    </li>
  );
}
