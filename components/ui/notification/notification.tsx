"use client";

import type { Notification } from "./notification.types";

interface NotificationProps {
  notification: Notification;
}

export function Notification({
  notification,
}: NotificationProps) {
  return (
    <div className="rounded-lg border bg-background p-4 shadow-lg">
      <h3 className="font-semibold">{notification.title}</h3>

      {notification.message && (
        <p className="mt-1 text-sm text-muted-foreground">
          {notification.message}
        </p>
      )}
    </div>
  );
}