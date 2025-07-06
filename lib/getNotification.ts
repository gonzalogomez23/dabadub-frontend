import { cookies } from 'next/headers';
import type { Notification, NotificationType } from "@app/types";

export async function getNotification(): Promise<Notification | null> {
  const cookieStore = await cookies();
  const message = cookieStore.get('notification')?.value ?? null;
  const type = (cookieStore.get('notificationType')?.value as NotificationType | undefined) ?? 'info';

  if (!message) return null;
  return { message, type };
}
