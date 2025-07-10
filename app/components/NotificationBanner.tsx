'use client';

import { useState, useEffect } from 'react';
import { Notification } from '../types';


const typeClasses: Record<Notification['type'], string> = {
  success: "text-green-800 bg-green-50 border-green-700",
  error: "text-red-800 bg-red-50 border-red-700",
  warning: "text-yellow-800 bg-yellow-50 border-yellow-700",
  info: "text-blue-800 bg-blue-50 border-blue-700",
};

export default function NotificationBanner({
  message,
  type = 'info',
}: Notification) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed z-10 top-0 left-0 w-screen flex justify-center p-8" role="alert">
        <div className={`relative z-50 max-w-full border-2 rounded-lg px-6 py-3 ${typeClasses[type]} transition-opacity duration-500`} >
        {message}
        </div>
    </div>
  );
}
