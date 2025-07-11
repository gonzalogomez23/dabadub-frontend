import { cookies } from 'next/headers';
import type { Notification } from "@app/types";

interface NotificationOptions extends Partial<Notification> {
  path?: string;
  maxAge?: number;
}

export async function setNotification({
  message,
  type = 'info',
  path = '/',
  maxAge = 4,
}: NotificationOptions) {
  if (!message) {
    console.warn('setNotification was called without a message. Skipping.');
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: 'notification',
    value: message,
    path,
    maxAge,
  });
  cookieStore.set({
    name: 'notificationType',
    value: type,
    path,
    maxAge,
  });
}