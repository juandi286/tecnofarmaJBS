import type { Notification } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Bell, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead?: (notificationId: string) => void;
}

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const Icon = notification.read ? CheckCircle : Bell;
  const cardBorderClass = notification.read ? 'border-muted' : 'border-primary';

  return (
    <Card className={cn("transition-all duration-300 ease-in-out hover:shadow-md", cardBorderClass, notification.read ? 'bg-muted/30' : 'bg-card')}>
      <CardHeader className="flex flex-row items-start gap-3 space-y-0 p-4">
         <div className={cn("p-2 rounded-full", notification.read ? 'bg-muted' : 'bg-primary/10' )}>
          <Icon className={cn("h-5 w-5", notification.read ? 'text-muted-foreground' : 'text-primary')} />
        </div>
        <div className="flex-1">
          <CardTitle className="text-base font-semibold font-headline">{notification.title}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {new Date(notification.date).toLocaleString()}
          </CardDescription>
        </div>
        {!notification.read && (
            <Badge variant="default" className="bg-accent text-accent-foreground text-xs">New</Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-foreground/80">{notification.description}</p>
        {onMarkAsRead && !notification.read && (
          <button
            onClick={() => onMarkAsRead(notification.id)}
            className="mt-2 text-xs text-primary hover:underline"
          >
            Mark as read
          </button>
        )}
      </CardContent>
    </Card>
  );
}
